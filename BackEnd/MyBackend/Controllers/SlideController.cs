using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using MyBackend.DTOs;
using System.Collections.Generic;
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
    public async Task<ActionResult<IEnumerable<Slide>>> GetSlides()
    {
            return await _context.Slides.ToListAsync();
    }
    [HttpPost]
    public async Task<ActionResult<Slide>> CreateSlide([FromForm] SlideUploadDto slideDto)
    {
            if (slideDto.Image == null || slideDto.Image.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder); // Create the directory if it doesn't exist
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(slideDto.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await slideDto.Image.CopyToAsync(stream);
            }

            var slide = new Slide
            {
                Name = slideDto.Name,
                Image = fileName // Save the file name or path
            };

            _context.Slides.Add(slide);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSlides), new { id = slide.Id }, slide);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSlide(int id)
    {
        var slide = await _context.Slides.FindAsync(id);
        if (slide == null)
        {
            return NotFound();
        }

        _context.Slides.Remove(slide);
        await _context.SaveChangesAsync();

        return NoContent(); // Returns a 204 No Content response
    }
}
