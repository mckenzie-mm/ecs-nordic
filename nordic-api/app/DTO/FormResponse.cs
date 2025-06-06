using webapi.Domain;

namespace webapi.DTO;

public record FormResponse(
    int id,
    string name,
    double price,
    string[] images,
    string slug, 
    string description,
    int availability,
    string category,
    List<Category> categories 
)
{
    public static FormResponse fromDomain(Product product, List<Category> categories)
    {
        return new FormResponse (
            product.id,
            product.name,
            product.price / 100.0,
            product.images.Split(','),
            product.slug,
            product.description,
            product.availability,
            product.category,
            categories
        );
    }
}

