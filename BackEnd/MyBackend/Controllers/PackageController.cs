using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/packages")]
[ApiController]
public class PackagesController : ControllerBase
{
        private readonly AppDbContext _context;

        public PackagesController(AppDbContext context)
        {
            _context = context;
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
            if (package == null)
            {
                return BadRequest("Package data is required.");
            }

            // Save the new package (with auto-generated _id and __v)
            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPackages), new { id = package._id }, package);
        }







    }
