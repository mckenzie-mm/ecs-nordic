using webapi.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    var DB_CONNECTION_STRING = builder.Configuration["DB_CONNECTION_STRING"];

    if (DB_CONNECTION_STRING != null)
    {
        builder.Services.AddSingleton(_ => new SeedService(DB_CONNECTION_STRING));
        builder.Services.AddSingleton(_ => new CategoriesService(DB_CONNECTION_STRING));
        builder.Services.AddSingleton(_ => new ProductsService(DB_CONNECTION_STRING));
    }
    
    builder.Services.AddControllers();
}

WebApplication app = builder.Build();
{
    // Configure the HTTP request pipeline.
    app.MapControllers();
}

app.Run();

