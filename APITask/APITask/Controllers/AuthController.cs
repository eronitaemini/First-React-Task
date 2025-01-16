using System.Net;
using System.Security.Claims;
using APITask;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        APIResponse _response;
        private readonly IGetRepo<User> _userRepo;
        public AuthController(IGetRepo<User> userRepo)
        {
            _userRepo = userRepo;
            this._response = new();
        }
        [Route("login")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<APIResponse>> Login([FromBody] UserLoginDTO loginrequest)
        {
            IEnumerable<User> usersFromDb = await _userRepo.GetAllAsync();
            User selectedUser = usersFromDb.FirstOrDefault(e => e.Email == loginrequest.email);

            if (string.IsNullOrEmpty(loginrequest.email) || string.IsNullOrEmpty(loginrequest.password))
            {
                return BadRequest();
            }
            if (selectedUser == null)
            {
                return NotFound("User not found");
            }
            bool passwordsMatch = BCrypt.Net.BCrypt.EnhancedVerify(loginrequest.password, selectedUser.Password);
            if (passwordsMatch)
            {
                var claims = new List<Claim>(){
                    new Claim(ClaimTypes.Name, selectedUser.Email),

                };
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            else
            {
                return Unauthorized("Invalid Credentials");
            }
        }

        [Route("logout")]
        [HttpPost]
        public IActionResult LogOut()
        {
            try
            {
                if (Response.Cookies.Equals(null))
                {
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.ErrorMessages = new List<string> { "the cookie doesn't exist" };
                    return BadRequest(_response);
                }
                Response.Cookies.Delete("auth");
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = "Cookie Deleted";
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.ErrorMessages = new List<string> {
                    ex.ToString()
                };
                _response.isSuccess = false;
                _response.StatusCode = HttpStatusCode.InternalServerError;
                return BadRequest(_response);
            }

        }
    }

}
