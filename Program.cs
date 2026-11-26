using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddProblemDetails();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}

var localAngularRoot = Path.Combine(app.Environment.ContentRootPath, "dist", "client", "browser");
using var localAngularFiles = File.Exists(Path.Combine(localAngularRoot, "index.html"))
    ? new PhysicalFileProvider(localAngularRoot)
    : null;

var angularFiles = new StaticFileOptions
{
    FileProvider = localAngularFiles ?? app.Environment.WebRootFileProvider
};

// Publish places the Angular assets in wwwroot. A source checkout instead serves
// the Angular build output from dist alongside the existing assets in wwwroot.
app.UseStaticFiles();
if (localAngularFiles is not null)
{
    app.UseStaticFiles(angularFiles);
}

app.MapControllers();
app.MapFallback("/api/{**path}", static context => Results.NotFound().ExecuteAsync(context));
app.MapFallbackToFile("index.html", angularFiles);

app.Run();
