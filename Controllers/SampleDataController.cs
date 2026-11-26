using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using MyContractor.Model;

namespace MyContractor.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class SampleDataController : ControllerBase
{
    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm",
        "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    [HttpGet("[action]")]
    public IReadOnlyList<WeatherForecast> WeatherForecasts()
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var forecasts = new WeatherForecast[5];

        for (var index = 0; index < forecasts.Length; index++)
        {
            forecasts[index] = new(
                today.AddDays(index + 1).ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]);
        }

        return forecasts;
    }
}
