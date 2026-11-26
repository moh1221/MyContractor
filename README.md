# MyContractor

MyContractor is a sample single-page application built with ASP.NET Core on .NET 10 LTS and Angular 22. It includes a home page, an interactive counter, and a weather table backed by the C# sample API. The weather data is generated for demonstration; it is not a live forecast.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- Node.js 24.15+ in the 24.x release line (recommended), with npm

## Run locally

Install the locked dependencies, build the Angular app, and start ASP.NET Core:

```sh
npm ci
npm run build
dotnet run --urls http://localhost:5000
```

Open [http://localhost:5000](http://localhost:5000). ASP.NET Core serves the Angular app and the sample API from the same origin. The main routes are `/home`, `/counter`, and `/fetch-data`. The weather screen calls `GET /api/SampleData/WeatherForecasts`.

For live frontend development, keep the ASP.NET Core process running on port 5000 and use `npm start` in a second terminal. Open [http://localhost:4200](http://localhost:4200); the Angular dev server forwards API requests to ASP.NET Core.

## Test and publish

```sh
npm ci
npm test
dotnet publish -c Release
bash scripts/smoke-test.sh
```

The publish step installs and builds the frontend and includes the browser output in the .NET deployment. The smoke test starts the published app, checks that the routes load and serve real JS/CSS assets, and verifies the JSON API and API 404 handling. The smoke script requires Bash, curl, and Python 3. Use `SMOKE_PORT` to override its default port (5089) if needed.

The deployable output is `bin/Release/net10.0/publish/`. Run `dotnet MyContractor.dll` from that directory locally, or deploy the published output to a host that supports .NET 10, such as Azure App Service. Don't deploy the standalone Angular build as a replacement for this output if you want to keep the C# API.

## Project layout

| Path | Purpose |
| --- | --- |
| `ClientApp/` | Angular application and regression tests |
| `Controllers/` | ASP.NET Core API controllers |
| `dist/client/browser/` | Generated frontend output (not committed) |
| `scripts/smoke-test.sh` | Checks the published HTTP application |
