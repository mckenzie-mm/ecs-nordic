using webapi.Domain;

namespace webapi.DTO;

public record FormRequest(
    int id,
    string name,
    string category,
    string? description,
    string[]? images,
    float price,
    int? availability
)
{
    public Product toDomain()
    {
        return new Product
        {
            id = id,
            name = name,
            slug = name.Replace(" ", "-").ToLower(),
            category = category,
            images = (images != null && images.Length != 0) ? string.Join(",", images!) : string.Empty ,
            description = string.IsNullOrEmpty(description) ? string.Empty : description,
            price = Convert.ToInt32(price * 100),
            availability = (int)((availability == null) ? 0 : availability)
            
        };
    }
}
