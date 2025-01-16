using System.Net;
using APITask;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        APIResponse _response;
        public UserController(IUserRepo userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            this._response = new();
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> CreateUser([FromBody] CreateUserDTO createUserDTO)
        {
            User user = _mapper.Map<User>(createUserDTO);
            bool userIsUnique = await _userRepo.IsUserUnique(user);
            if (!userIsUnique)
            {
                _response.isSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages = new List<string> { "The user with the given email already exists" };
                return Conflict(_response);
            }

            if (createUserDTO.confirmPassword != createUserDTO.Password)
            {
                _response.isSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages = new List<string> { "Passwords do not match" };

                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = user;
            string hashedPassword = _userRepo.HashPassword(user.Password);
            user.Password = hashedPassword;
            await _userRepo.CreateNewAsync(user);
            return Ok(_response);
        }




    }
}
