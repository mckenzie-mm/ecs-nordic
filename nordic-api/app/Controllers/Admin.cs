using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Domain;
using webapi.DTO;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Admin(ProductsService productsService, CategoriesService categoriesService) : ControllerBase
    {
        private readonly ProductsService _productsService = productsService;
        private readonly CategoriesService _categoriesService = categoriesService;

        [HttpPost("form")]
        public async Task<IActionResult> PostProduct([FromForm] FormRequest request)
        {
            try
            {
                var product = request.toDomain();
                var res = await _productsService.GetProductByName(product.name);     
                if (res != null)
                {
                    return BadRequest(new
                    {
                        title = "One or more validation errors occurred.",
                        status = 400,
                        errors = new
                        {
                            name = new string [1]{ "a product with that name already exists"},
                        }
                    });
                }
                // invoking the use case
                await _productsService.Create(product);
                var createdProduct = await _productsService.GetProduct(product.id);
                return CreatedAtAction(nameof(GetProductBySlug), new { product.slug }, ProductDTO.fromDomain(createdProduct!));
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            // 
        }

        [HttpPut("form/{id:int}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] FormRequest request)
        {
            try
            {
                 var product = request.toDomain();
                await _productsService.UpdateAsync(id, product);
                return NoContent();
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { message = ex.Message });
            }    
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<ProductDTO>> GetProductBySlug(string slug)
        {
            var product = await _productsService.GetProductBySlug(slug);
            if (product == null)
            {
                return NotFound();
            }
            return ProductDTO.fromDomain(product);
        }

       
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productsService.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            await _productsService.DeleteProduct(product.id);
            return NoContent();
        }


        [HttpGet("form/{slug}")]
        public async Task<IActionResult> GetForm(string slug)
        {
            // invoking the use case
            var product = await _productsService.GetProductBySlug(slug);
            var categories = (List<Category>)await _categoriesService.Get();
            // mapping to external representation
            return Ok(FormResponse.fromDomain(product!, categories));
        }

        [HttpGet("count")]
        public async Task<int> GetCount()
        {
            var count = await _productsService.GetCount();
            return count;
        }
    }
}
