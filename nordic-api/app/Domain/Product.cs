using System;

namespace webapi.Domain;

public class Product
{
    public int id { get; init; }
    public required string name { get; init; }
    public required int price { get; init; }
    public string? images { get; init; }
    public required string slug { get; init; }
    public string? description { get; init; }
    public int availability { get; init; }
    public required string category  { get; init; }
}


