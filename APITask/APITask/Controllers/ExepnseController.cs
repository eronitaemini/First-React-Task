using System.Net;
using APITask;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace MyApp.Namespace
{
    [Route("api/Expense")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IGetRepo<Expense> _getExpenseRepo;
        private readonly ICreateRepo<Expense> _createExpenseRepo;
        private readonly IExpenseRepo _expenseRepoOperations;
        private readonly IGetRepo<Category> _categoryRepo;
        public APIResponse _response;
        public ExpenseController(IMapper mapper, IGetRepo<Expense> expenseRepo,
        ICreateRepo<Expense> createExpenseRepo, IExpenseRepo expenseRepoOperations,
        IGetRepo<Category> categoryRepo)
        {
            _getExpenseRepo = expenseRepo;
            _createExpenseRepo = createExpenseRepo;
            _mapper = mapper;
            _expenseRepoOperations = expenseRepoOperations;
            _categoryRepo = categoryRepo;
            this._response = new();
        }

        [HttpGet]
        public async Task<ActionResult<APIResponse>> GetAllExpenses()
        {

            IEnumerable<Expense> expensesList = await _getExpenseRepo.GetAllAsync(query =>
                query.Include(e => e.Category));
            _response.Result = _mapper.Map<List<ViewExpenseDTO>>(expensesList);
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult<APIResponse>> CreateExpense([FromBody] CreateExpenseDTO createExpenseDTO)
        {
            try
            {
                if (createExpenseDTO == null)
                {
                    return BadRequest();
                }
                IEnumerable<Expense> retrievedExpensesList = await _getExpenseRepo.GetAllAsync();
                Expense element = retrievedExpensesList.FirstOrDefault(e => e.Title.ToLower() == createExpenseDTO.Title.ToLower());
                if (element != null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.isSuccess = false;
                    _response.ErrorMessages = new List<string> { "An expense with the same title already exists" };
                    return BadRequest(_response);
                }

                Expense expense = _mapper.Map<Expense>(createExpenseDTO);
                var category = await _categoryRepo.GetByIdAsync(createExpenseDTO.CategoryId);
                expense.Category = category;
                expense.CreatedAt = DateTime.Now;
                _response.StatusCode = HttpStatusCode.OK;
                await _createExpenseRepo.CreateNewAsync(expense);

                ViewExpenseDTO viewExpenseDTO = _mapper.Map<ViewExpenseDTO>(expense);

                _response.Result = viewExpenseDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.isSuccess = false;
                return BadRequest(_response);
            }
            // return _response;
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<ActionResult<APIResponse>> UpdateExpense([FromBody] UpdateExpenseDTO updateExpenseDTO, int id)
        {
            try
            {

                if (id == 0 || id != updateExpenseDTO.Id)
                {
                    return BadRequest("The id does not match");
                }

                Expense expenseToUpdate = await _getExpenseRepo.GetByIdAsync(id);
                Expense updatedExpense = _mapper.Map(updateExpenseDTO, expenseToUpdate);
                await _expenseRepoOperations.UpdateExpense(updatedExpense);
                return Ok(updateExpenseDTO);
            }
            catch (Exception ex)
            {
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.isSuccess = false;
                return BadRequest(_response);
            }
        }
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<APIResponse>> DeleteExpense(int id)
        {

            try
            {
                Expense entityToDelete = await _getExpenseRepo.GetByIdAsync(id);
                if (entityToDelete == null)
                {
                    return NotFound();
                }
                await _expenseRepoOperations.DeleteExpense(entityToDelete);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.isSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                return _response;
            }

        }
    }
}
