using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using MyBackend.Services; // Add this to use AuthService
using System.Collections.Generic;
using System.Threading.Tasks;







using Microsoft.EntityFrameworkCore;







using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt; // For JwtSecurityTokenHandler
using Microsoft.IdentityModel.Tokens; // For TokenValidationParameters and SymmetricSecurityKey
using System.Text; // For Encoding

[Route("api/packages")]
[ApiController]
public class PackagesController : ControllerBase
{
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public PackagesController(AppDbContext context,AuthService authService)
        {
            _context = context;
            _authService = authService;
            
        }

        [HttpGet]
        public async Task<ActionResult<PackageResponse>> GetPackages()
        {
            var packages = await _context.Packages.ToListAsync(); // Fetch all packages
            var response = new PackageResponse
            {
                Count = packages.Count, // Set the count of packages
                Packages = packages     // Assign the list of packages
            };

            return Ok(response); // Return the response object
        }


        // GET: api/packages/belongto/{belongTo}
        [HttpGet("belongto/{belongTo}")]
        public async Task<ActionResult<PackageResponse>> GetPackagesByBelongTo(string belongTo)
        {
            var packages = await _context.Packages
                .Where(p => p.belongTo == belongTo) // Use lowercase 'belongTo'
                .ToListAsync();

            if (packages == null || packages.Count == 0)
            {
                return NotFound($"No packages found with belongTo: {belongTo}");
            }

            var response = new PackageResponse
            {
                Count = packages.Count,
                Packages = packages
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Package>> GetPackageById(string id)
        {
            var package = await _context.Packages.FindAsync(id); // Find the package by _id

            if (package == null)
            {
                return NotFound($"Package with ID {id} not found.");
            }

            return Ok(package); // Return the found package
        }


        // POST: api/packages
        [HttpPost]
        public async Task<ActionResult<Package>> CreatePackage([FromBody] Package package)
        {
            // Ensure that package data is provided
            if (package == null)
            {
                return BadRequest("Package data is required.");
            }

            // Validate the token
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var principal = _authService.ValidateJwtToken(token,  "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

            if (string.IsNullOrEmpty(token) || principal == null)
            {
                return Unauthorized(new { Message = "Invalid token" ,Token=token});
            }

            // Add and save the new package
            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPackages), new { id = package._id }, package);
        }


        // DELETE: api/packages/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePackage(string id)
        {
            // Extract and validate the token
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

            if (string.IsNullOrEmpty(token) || principal == null)
            {
                return Unauthorized(new { Message = "Invalid token" });
            }

            // Find the package by ID
            var package = await _context.Packages.FindAsync(id);

            if (package == null)
            {
                return NotFound($"Package with ID {id} not found.");
            }

            // Remove the package from the context
            _context.Packages.Remove(package);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content response
        }


    }
