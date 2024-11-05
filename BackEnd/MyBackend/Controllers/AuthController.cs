using Microsoft.AspNetCore.Mvc;
using MyBackend.Models;
using MyBackend.Services;

using System.IdentityModel.Tokens.Jwt; // For JwtSecurityTokenHandler and related classes
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims; // For ClaimsIdentity and Claim
using System.Text; // For Encoding
using System;


namespace MyBackend.Controllers
{
    [Route("api/dash")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // Endpoint to register a new admin
        [HttpPost("register")]
        public IActionResult Register([FromBody] Admin admin)
        {
            if (admin == null || string.IsNullOrEmpty(admin.Name) || string.IsNullOrEmpty(admin.Email) || string.IsNullOrEmpty(admin.Password))
            {
                return BadRequest("Name, email, and password are required.");
            }

            if (_authService.RegisterAdmin(admin.Name, admin.Email, admin.Password))
            {
                return Ok(new { Message = "Admin registered successfully." });
            }
            return BadRequest(new { Message = "Admin with this email already exists." });
        }

        // Endpoint to login by email and password only
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { Message = "Email and password are required." });
            }

            // Check credentials
            if (_authService.ValidateAdminCredentials(loginRequest.Email, loginRequest.Password))
            {
                // Fetch the admin by email and generate a token
                var admin = _authService.GetAdminByEmail(loginRequest.Email);
                var jwtToken = _authService.GenerateJwtToken(admin,"MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");
                var principal = _authService.ValidateJwtToken(jwtToken,"MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

                        return Ok(new { user = jwtToken });
  
                // return Ok(new 
                // { 
                //     Name = admin.Name, // Assuming you have a Name property in your Admin model
                //     Id = admin.Id.ToString(), // Assuming you have an Id property in your Admin model
                //     Role = "admin" // Hardcoded role
                // });
            }




            // If credentials are invalid
            return Unauthorized(new { Message = "Invalid email or password." });
        }

        [HttpGet("admins")]
        public IActionResult GetAllAdmins()
        {
            var admins = _authService.GetAllAdmins();
            return Ok(admins);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            if (_authService.DeleteAdminById(id))
            {
                return Ok(new { Message = "Admin deleted successfully." });
            }
            return NotFound(new { Message = "Admin not found." });
        }
    }
}
