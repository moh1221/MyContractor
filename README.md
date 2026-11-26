# MyContractor

MyContractor is a sample single-page application built with ASP.NET Core 2.0 and Angular 4. The Angular app runs in the browser. ASP.NET Core serves the page, JavaScript bundles, and a sample JSON API.

## Prerequisites

- A [.NET Core 2.0-era SDK](https://dotnet.microsoft.com/en-us/download/dotnet/2.0) that supports `netcoreapp2.0`.
- Node.js and npm compatible with the project’s Webpack 2 toolchain.
- Google Chrome for the Karma tests.

.NET Core 2.0 is out of support. Use this project for local development or reference.

## Run locally

From the repository root, install the JavaScript dependencies, build the project, and start the server.

```sh
npm install
dotnet build
dotnet run
```

Open [http://localhost:5000](http://localhost:5000), or use the listening URL printed by `dotnet run`.

- `/home` shows the home page.
- `/counter` demonstrates Angular component state.
- `/fetch-data` loads sample weather forecasts from `GET /api/SampleData/WeatherForecasts`.

## Run the client tests

Build the development vendor bundle first. Karma loads `wwwroot/dist/vendor.js` before running the Jasmine tests in Chrome.

```sh
node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js
npm test -- --single-run
```

Run `npm test` for watch mode.

## Project layout

| Path | Purpose |
| --- | --- |
| `ClientApp/app/` | Angular components and routes |
| `ClientApp/test/` | Karma configuration and test bootstrap |
| `Controllers/` | ASP.NET Core page and sample API controllers |
| `Views/Home/Index.cshtml` | Host page that loads the browser bundles |
| `wwwroot/dist/` | Generated JavaScript and CSS |

If the browser stays on `Loading...`, rebuild both browser bundles from the repository root and refresh the page.

```sh
node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js
node node_modules/webpack/bin/webpack.js
```
