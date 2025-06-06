using Dapper;
using Microsoft.Data.Sqlite;
using webapi.Domain;

namespace webapi.Services;

public class ProductsService
{
    private readonly string _connectionString;
    public ProductsService(string connection)
    {
        _connectionString = connection;
    }

    public async Task<int> Create(Product product)
    {
        var sql = @"INSERT INTO products (
            category, 
            name, 
            price,
            description,
            images,
            slug,
            availability
            ) 
            VALUES (
            @category, 
            @name, 
            @price, 
            @description, 
            @images,
            @slug,
            @availability
            )";
        try
        {
            // Open a new database connection
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();


            // Bind parameters values
            using var command = new SqliteCommand(sql, connection);

            command.Parameters.AddWithValue("@category", product.category);
            command.Parameters.AddWithValue("@name", product.name);
            command.Parameters.AddWithValue("@price", product.price);
            command.Parameters.AddWithValue("@description", product.description);
            command.Parameters.AddWithValue("@images", product.images);
            command.Parameters.AddWithValue("@slug", product.slug);
            command.Parameters.AddWithValue("@availability", product.availability);

            // Execute the INSERT statement
            var rowInserted = await command.ExecuteNonQueryAsync();
            return rowInserted;
        }
        catch (SqliteException ex)
        {
            Console.WriteLine(ex.Message);
            return -1;
        }
    }

    public async Task<int> UpdateAsync(int id, Product product)
    {
        var sql = @"UPDATE products SET 
            name=@name, 
            price=@price,
            description=@description,
            largeImage=@images,
            slug=@slug,
            availability=@availability
            WHERE id=@id";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            var res = await connection.ExecuteAsync(sql, new
            {
                product.name,
                product.price,
                product.description,
                product.images,
                product.slug,
                product.availability,
                id
            });
            return res;
        }
        catch (SqliteException ex)
        {
            Console.WriteLine(ex.Message);
            return -1;
        }
    }
    public async Task<Product?> Get(int id)
    {
        var sql = "SELECT * FROM products WHERE id=@id";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            var res = await connection.QuerySingleAsync<Product>(sql, new { id });
            return res;
        }
        catch (SqliteException ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }

    public async Task<IEnumerable<Product>> Get()
    {
        var sql = "SELECT * FROM products";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var res = await connection.QueryAsync<Product>(sql);
            return res;
        }
        catch (SqliteException)
        {
            return [];
        }
    }

    public async Task<Product?> GetProductByName(string name)
    {
        Console.WriteLine($"Product name: {name}");
        var sql = "SELECT * FROM products WHERE name=@name";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            var res = await connection.QueryFirstOrDefaultAsync<Product>(sql, new { name });
            return res;
        }
        catch (SqliteException)
        {
            return null;
        }
    }


    public async Task<Product?> GetProductBySlug(string slug)
    {
        var sql = "SELECT * FROM products WHERE slug=@slug";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            var res = await connection.QueryFirstOrDefaultAsync<Product>(sql, new { slug });
            return res;
        }
        catch (SqliteException)
        {
            return null;
        }
    }

     public async Task<Product?> GetProduct(int id)
    {
        var sql = "SELECT * FROM products WHERE id=@id";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var res = await connection.QuerySingleAsync<Product>(sql, new { id });

            return res;

        }
        catch (SqliteException)
        {
            return null;
        }
    }


    public async Task<IEnumerable<Product>> findAll(int currentPage, int ITEMS_PER_PAGE)
    {

        var OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;

        var sql = "SELECT * FROM products ORDER BY id DESC LIMIT @ITEMS_PER_PAGE OFFSET @OFFSET";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var res = await connection.QueryAsync<Product>(sql, new { ITEMS_PER_PAGE, OFFSET });
            return res;

        }
        catch (SqliteException)
        {
            return [];
        }
    }

    public async Task<IEnumerable<Product>> FindByCategory(string category, int currentPage, int ITEMS_PER_PAGE)
    {
        var OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;

        var sql = @"SELECT * FROM products WHERE category=@category
                ORDER BY id DESC LIMIT @ITEMS_PER_PAGE OFFSET @OFFSET";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var res = await connection.QueryAsync<Product>(sql, new { category, ITEMS_PER_PAGE, OFFSET });
            return res;

        }
        catch (SqliteException)
        {
            return [];
        }
    }

    public async Task<IEnumerable<Product>> GetSimilar(string category, int id)
    {
        var sql = @"SELECT * FROM products WHERE category=@category AND NOT id=@id
            ORDER BY id DESC LIMIT @LIMIT";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var res = await connection.QueryAsync<Product>(sql, new { category, id, LIMIT = 4 });
            return res;
        }
        catch (SqliteException)
        {
            return [];
        }
    }

    public async Task<int> GetCount()
    {
        var sql = "SELECT COUNT(*) FROM products";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            using var command = new SqliteCommand(sql, connection);
            int count = (int)(long)await command.ExecuteScalarAsync();
            return count;
        }
        catch (SqliteException)
        {
            return -1;
        }
    }

    public async Task<int> DeleteProduct(int id)
    {
        var sql = "DELETE FROM products WHERE id = @id";
        try
        {
            // Open a new database connection
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();
            // Bind parameters values
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);

            // Execute the DELETE statement
            var rowDeleted = await command.ExecuteNonQueryAsync();
            return rowDeleted;
        }
        catch (SqliteException)
        {
            return -1;
        }
    }
    
}

