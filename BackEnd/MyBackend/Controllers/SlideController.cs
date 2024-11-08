
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.DTOs;
using MyBackend.Services;
using MyBackend.Models;
using MyBackend.DTOs; // Ensure this has your SlideUploadDto
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt; // For JwtSecurityTokenHandler
using Microsoft.IdentityModel.Tokens; // For TokenValidationParameters and SymmetricSecurityKey
using System.Text; // For Encoding
using System.Threading.Tasks; // For Task


using System.Security.Claims;

[Route("api/homepage")]
[ApiController]
public class SlidesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AuthService _authService;
    public SlidesController(AppDbContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    // GET: api/homepage
    [HttpGet]
    public async Task<ActionResult<SlideResponse>> GetSlides()
    {
        var slides = await _context.Slides.ToListAsync(); // Fetch all slides
        var response = new SlideResponse
        {
            Count = slides.Count, // Set the count
            MainServices = slides  // Assign the slides to MainService
        };

        return Ok(response); // Return the response object
    }



    [HttpPost]
    public async Task<ActionResult<Slide>> CreateSlide([FromBody] SlideRequestDto requestDto)
    {
        // Retrieve the token from the request headers
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        // Validate the token
        var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

        if (string.IsNullOrEmpty(token) || principal == null)
        {
            return Unauthorized(new { Message = "Invalid token" });
        }

        // Now get the slide DTO from the request body
        var slideDto = requestDto.Slide;

        // Check if a slide with the same name already exists
        if (await _context.Slides.AnyAsync(s => s.Name == slideDto.Name))
        {
            return Conflict("A slide with this name already exists.");
        }

        var slide = new Slide
        {
            Name = slideDto.Name,
            IsAdditional = slideDto.IsAdditional
        };

        _context.Slides.Add(slide);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, "Error saving to the database: " + ex.Message);
        }

        return CreatedAtAction(nameof(GetSlides), new { id = slide.Id }, slide);
    }





    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSlide(int id)
    {
        // Get the token from the Authorization header
        var authHeader = Request.Headers["Authorization"].ToString();
        var token = authHeader.StartsWith("Bearer ") ? authHeader.Substring("Bearer ".Length).Trim() : null;

        // Validate the token
        var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");
        if (string.IsNullOrEmpty(token) || principal == null)
        {
            return Unauthorized(new { Message = "Invalid token" });
        }

        var slide = await _context.Slides.FindAsync(id);
        if (slide == null)
        {
            return NotFound();
        }

        // Remove the slide from the database
        _context.Slides.Remove(slide);
        await _context.SaveChangesAsync();

        return NoContent(); // Returns a 204 No Content response
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<Slide>> UpdateSlide(int id, [FromBody] SlideRequestDto requestDto)
    {
        // Retrieve the token from the request headers
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        // Validate the token
        var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

        if (string.IsNullOrEmpty(token) || principal == null)
        {
            return Unauthorized(new { Message = "Invalid token" });
        }

        // Find the existing slide
        var slide = await _context.Slides.FindAsync(id);
        if (slide == null)
        {
            return NotFound(new { Message = "Slide not found." });
        }

        // Update slide properties
        slide.Name = requestDto.Slide.Name;
        slide.IsAdditional = requestDto.Slide.IsAdditional;

        // Save changes to the database
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, "Error updating the database: " + ex.Message);
        }

        return Ok(slide); // Return the updated slide
    }






            //check token validation API
        public class TokenValidationRequestDto
        {
            public string Token { get; set; }
        }


        [HttpPost("ValidateToken")]
        public ActionResult ValidateToken([FromBody] TokenValidationRequestDto requestDto)
        {
            // Check if token was provided in the request body
            if (string.IsNullOrEmpty(requestDto.Token))
            {
                return BadRequest(new { Message = "Token is required" });
            }

            // Validate the token using the authentication service
            var principal = _authService.ValidateJwtToken(requestDto.Token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

            if (principal == null)
            {
                // Return unauthorized if token is invalid
                return Unauthorized(new { Message = "Invalid token" });
            }

            // Return success response if token is valid
            return Ok(new { Message = "Token is valid" });
        }

}
