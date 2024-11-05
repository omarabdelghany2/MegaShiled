using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using MyBackend.DTOs;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

[Route("api/homepage")]
[ApiController]
public class SlidesController : ControllerBase
{
    private readonly AppDbContext _context;

    public SlidesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/slides
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

    // POST: api/slides
    [HttpPost]
    public async Task<ActionResult<Slide>> CreateSlide([FromForm] SlideUploadDto slideDto)
    {
        if (slideDto.Image == null || slideDto.Image.Length == 0)
        {
            return BadRequest("Image file is required.");
        }

        // Check if the slide name already exists
        if (await _context.Slides.AnyAsync(s => s.Name == slideDto.Name))
        {
            return Conflict("A slide with this name already exists.");
        }

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "static/slides");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder); // Create the directory if it doesn't exist
        }

        // Create a unique filename for the uploaded image
        var fileName = Guid.NewGuid() + Path.GetExtension(slideDto.Image.FileName);
        var filePath = Path.Combine(uploadsFolder, fileName);

        try
        {
            // Save the uploaded image file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await slideDto.Image.CopyToAsync(stream);
            }
        }
        catch (IOException ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }

        // Create a new Slide object with IsAdditional included
        var slide = new Slide
        {
            Name = slideDto.Name,
            Image = fileName, // Store the filename or path
            IsAdditional = slideDto.IsAdditional // Set IsAdditional from DTO
        };

        _context.Slides.Add(slide);

        // Save changes to the database
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, "Error saving to the database: " + ex.Message);
        }

        // Return a 201 Created response with the created slide
        return CreatedAtAction(nameof(GetSlides), new { id = slide.Id }, slide);
    }

    // DELETE: api/slides/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSlide(int id)
    {
        var slide = await _context.Slides.FindAsync(id);
        if (slide == null)
        {
            return NotFound();
        }

        // Optionally: Remove the image file from the server
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "static/slides");
        var filePath = Path.Combine(uploadsFolder, slide.Image);
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        // Remove the slide from the database
        _context.Slides.Remove(slide);
        await _context.SaveChangesAsync();

        return NoContent(); // Returns a 204 No Content response
    }
}
