
using webapi.Domain;

namespace webapi.DTO;


public record class ProductDTO(
    int id,
    string name,
    double price,
    string[] images,
    string slug,
    string description,
    int availability,
    string category
)
{
    public static ProductDTO fromDomain(Product product)
    {
        return new ProductDTO(
            product.id,
            product.name,
            product.price / 100.0,
            product.images.Split(','),
            product.slug,
            product.description,
            product.availability,
            product.category
        );
    }
}
