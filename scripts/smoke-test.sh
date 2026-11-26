#!/usr/bin/env bash
set -euo pipefail

publish_dir="$(cd "${1:-bin/Release/net10.0/publish}" && pwd)"
temp="$(mktemp -d)"
port="${SMOKE_PORT:-5089}"
url="http://127.0.0.1:$port"
pid=''
cleanup() {
  if [[ -n "$pid" ]]; then
    kill "$pid" 2>/dev/null || true
    wait "$pid" 2>/dev/null || true
  fi
  rm -rf "$temp"
}
trap cleanup EXIT

dotnet_cmd="$(command -v dotnet)"
(cd "$publish_dir" && exec "$dotnet_cmd" MyContractor.dll --urls "$url") >"$temp/server.log" 2>&1 &
pid=$!
for ((i=0; i<60; i++)); do
  if ! kill -0 "$pid" 2>/dev/null; then cat "$temp/server.log" >&2; exit 1; fi
  if curl --noproxy '*' -fsS "$url/" -o "$temp/index.html" 2>/dev/null; then break; fi
  sleep .25
done
if [[ ! -s "$temp/index.html" ]]; then cat "$temp/server.log" >&2; exit 1; fi
for route in home counter fetch-data; do
  curl --noproxy '*' -fsS "$url/$route" -o "$temp/route.html"
  cmp "$temp/index.html" "$temp/route.html"
done

curl --noproxy '*' -fsS "$url/api/SampleData/WeatherForecasts" -o "$temp/weather.json"
for route in api api/ api/unknown api/unknown.json missing-asset.js; do
  status_type="$(curl --noproxy '*' -sS -o /dev/null -w '%{http_code} %{content_type}' "$url/$route")"
  [[ "$status_type" == "404 "* && "$status_type" != *text/html* ]]
done
python3 - "$temp" "$url" <<'PYTHON'
import json
import sys
from datetime import date, timedelta
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import ProxyHandler, build_opener

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.styles = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.styles.append(attrs["href"])

directory = Path(sys.argv[1])
rows = json.loads((directory / "weather.json").read_text())
assert isinstance(rows, list) and len(rows) == 5, rows
dates = [date.fromisoformat(row["dateFormatted"]) for row in rows]
assert all(right - left == timedelta(days=1) for left, right in zip(dates, dates[1:])), dates
for row in rows:
    assert row.keys() == {"dateFormatted", "temperatureC", "temperatureF", "summary"}, row
    assert isinstance(row["summary"], str) and row["summary"]
    assert isinstance(row["temperatureC"], int) and -20 <= row["temperatureC"] <= 54, row
    assert row["temperatureF"] == round(row["temperatureC"] * 9 / 5 + 32), row
assets = Assets()
assets.feed((directory / "index.html").read_text())
assert assets.scripts, "Expected a compiled Angular script"
opener = build_opener(ProxyHandler({}))
for asset in assets.scripts + assets.styles:
    with opener.open(urljoin(sys.argv[2] + "/", asset), timeout=10) as response:
        assert response.status == 200
        assert response.headers.get_content_type() != "text/html", asset
        assert response.read(1), asset
PYTHON
echo "Published app smoke test passed."
