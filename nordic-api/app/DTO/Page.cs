
using webapi.Domain;

namespace webapi.DTO;

public record class Page(
    ProductDTO? productDTO,
    List<ProductDTO>? productsDTO
)
{
    public static Page fromDomain(Product product, List<Product> products)
    {
        return new Page(
            ProductDTO.fromDomain(product),
            products.ConvertAll(ProductDTO.fromDomain)
        );
    }
}
