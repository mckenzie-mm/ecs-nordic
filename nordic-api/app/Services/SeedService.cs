using System.Text.Json;
using Dapper;
using Microsoft.Data.Sqlite;
using webapi.Domain;

namespace webapi.Services;

public interface ISeedService
{
    Task DeleteFile();
    Task Initialise();
    Task Seed();
}

public class SeedService : ISeedService
{
    private readonly string _connectionString;
    public SeedService(string DB_CONNECTION_STRING)
    {
        _connectionString = DB_CONNECTION_STRING;
    }

    public async Task Seed()
    {
        SqliteConnection.ClearAllPools(); // required before delete file 
        await DeleteFile();
        await Initialise();
        await SeedCategories();
        await SeedProducts();
    }

    public async Task DeleteFile()
    {
        var fileName = _connectionString[(_connectionString.LastIndexOf('=') + 1)..];
        await Task.Run(() => File.Delete(fileName));
    }

    public async Task Initialise()
    {
        Console.WriteLine("called init");

        await CreateTable(@"
                    CREATE TABLE categories (
                        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL
                    );");
        Console.WriteLine("Categories table created");

        await CreateTable(@"
                    CREATE TABLE products (
                        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        price INTEGER NOT NULL,
                        images TEXT,
                        slug TEXT NOT NULL,
                        description TEXT,
                        availability INTEGER NOT NULL,
                        category  TEXT NOT NULL
                    );");

        Console.WriteLine("Products table created");
    }

    private async Task CreateTable(string sql)
    {
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            using var command = new SqliteCommand(sql, connection);
            await command.ExecuteNonQueryAsync();
        }
        catch (SqliteException ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
    private async Task SeedCategories()
    {
        var sql = "INSERT INTO categories (id, name) VALUES (@id, @name)";
        try
        {
            var incoming = new List<Category>();
            using (StreamReader r = new StreamReader("categories.json"))
            {
                string json = r.ReadToEnd();
                incoming = JsonSerializer.Deserialize<List<Category>>(json);
            }

            if (incoming != null && incoming.Count > 0)
            {
                using var connection = new SqliteConnection(_connectionString);
                connection.Open();
                await connection.ExecuteAsync(sql, incoming);
            }
        }
        catch (SqliteException ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    private async Task SeedProducts()
    {
        var sql = @"INSERT INTO products 
                (id,
                name,
                price,
                images,
                slug,
                description,
                availability,
                category) 
            VALUES
                (@id,
                @name,
                @price,
                @images,
                @slug,
                @description,
                @availability,
                @category)";
        try
        {
            var incoming = new List<Product>();
            using (StreamReader r = new StreamReader("products.json"))
            {
                string json = r.ReadToEnd();
                incoming = JsonSerializer.Deserialize<List<Product>>(json);
            }

            if (incoming != null && incoming.Count > 0)
            {
                using var connection = new SqliteConnection(_connectionString);
                connection.Open();
                await connection.ExecuteAsync(sql, incoming);
            }
        }
        catch (SqliteException ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
