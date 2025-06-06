using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Domain;
using webapi.DTO;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Products(ProductsService productsService) : ControllerBase
    {
        private readonly ProductsService _productsService = productsService;

        [HttpGet]
        public async Task<List<ProductDTO>> Get()
        {
            try
            {
                var res = await _productsService.Get();
                if (res == (IEnumerable<Product>)[])
                {
                    return [];
                }
                var products = (List<Product>)res;
                return products.ConvertAll(ProductDTO.fromDomain);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("products route");
                Console.WriteLine(ex);
                return [];
            }
        }

        [HttpGet("list/{currentPage:int}/{ITEMS_PER_PAGE:int}")]
        public async Task<List<ProductDTO>> Get(int currentPage, int ITEMS_PER_PAGE)
        {
            try
            {
                var res = await _productsService.findAll(currentPage, ITEMS_PER_PAGE);
                if (res == (IEnumerable<Product>)[])
                {
                    return [];
                }
                var products = (List<Product>)res;
                return products.ConvertAll(ProductDTO.fromDomain);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("products route");
                Console.WriteLine(ex);
                return [];
            }
        }

        [HttpGet("list/{category}/{currentPage:int}/{ITEMS_PER_PAGE:int}")]
        public async Task<List<ProductDTO>> GetByCategory(string category, int currentPage, int ITEMS_PER_PAGE)
        {
            try
            {
                var res = await _productsService.FindByCategory(category, currentPage, ITEMS_PER_PAGE);
                if (res == (IEnumerable<Product>)[])
                {
                    return [];
                }
                var products = (List<Product>)res;
                return products.ConvertAll(ProductDTO.fromDomain);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("products route");
                Console.WriteLine(ex);
                return [];
            }
        }

        [HttpGet("page/{slug}")]
        public async Task<Page?> GetProductPage(string slug)
        {
            var defProduct = ProductDTO.fromDomain(new Product
            {
                id = -1,
                name = "",
                price = 100,
                images = "",
                slug = "",
                description = "",
                availability = 1,
                category = "bracelets"
            });

            var product = await _productsService.GetProductBySlug(slug);
            if (product == null)
            {
                Console.WriteLine("product route");
                return new Page(defProduct, []);
            }
            else
            {
                 List<Product> similar = (List<Product>) await _productsService.GetSimilar(product.category, product.id);
                var page = Page.fromDomain(product, similar);
                return page;
            } 
        }

    }
}


