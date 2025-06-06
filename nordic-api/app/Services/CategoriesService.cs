using System;
using Dapper;
using Microsoft.Data.Sqlite;
using webapi.Domain;

namespace webapi.Services;

public class CategoriesService
{

    private readonly string _connectionString;
    public CategoriesService(string connection)
    {
        _connectionString = connection;
    }

    public async Task<IEnumerable<Category>> Get() {
        var sql = "SELECT * FROM categories";
        try
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var res = await connection.QueryAsync<Category>(sql);
            return res;

        }
        catch (SqliteException)
        {
            return [];
        }
    }
}
