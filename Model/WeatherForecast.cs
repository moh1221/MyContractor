namespace MyContractor.Model;

public sealed record WeatherForecast(string DateFormatted, int TemperatureC, string Summary)
{
    public int TemperatureF => (int)Math.Round(TemperatureC * 9.0 / 5.0 + 32);
}
