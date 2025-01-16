using System.Net;
using APITask;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/Category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IGetRepo<Category> _categoryRepo;
        public APIResponse _response;
        public CategoryController(IMapper mapper, IGetRepo<Category> categoryRepo)
        {
            _categoryRepo = categoryRepo;
            _mapper = mapper;
            this._response = new();
        }

        [HttpGet]
        public async Task<ActionResult<APIResponse>> GetAllCategories()
        {
            try
            {
                IEnumerable<Category> categoriesList = await _categoryRepo.GetAllAsync();
                List<ViewCategoryDTO> categories = _mapper.Map<List<ViewCategoryDTO>>(categoriesList);
                _response.Result = categories;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.ErrorMessages = new List<string> {
                    ex.ToString()};
                _response.StatusCode = HttpStatusCode.InternalServerError;
                return BadRequest(_response);
            }
        }
    }
}
