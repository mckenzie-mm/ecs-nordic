using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Domain;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Categories(CategoriesService categoriesService) : ControllerBase
    {
        private readonly CategoriesService _categoriesService = categoriesService;
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            var categories = await _categoriesService.Get();
            return categories;
        }
    }
}
