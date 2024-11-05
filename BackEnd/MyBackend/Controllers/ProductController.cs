using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using MyBackend.Services; // Add this to use AuthService
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyBackend.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public ProductsController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        // POST: api/products
        [HttpPost("create")]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
        {
            // Validate token
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

            if (string.IsNullOrEmpty(token) || principal == null)
            {
                return Unauthorized(new { Message = "Invalid token" });
            }

            // Ensure product data is provided
            if (product == null)
            {
                return BadRequest("Product data is required.");
            }

            // Add and save the new product
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductById), new { id = product._id }, product);
        }


        // GET: api/products - No authentication required for fetching products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok(product);
        }




        [HttpPost("{id}/upload-image")]
        public async Task<IActionResult> UploadProductImage(string id, [FromForm] IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("An image file is required.");
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            var imageName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var imagePath = Path.Combine("static", "products", imageName);

            if (!Directory.Exists(Path.Combine("static", "products")))
            {
                Directory.CreateDirectory(Path.Combine("static", "products"));
            }

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            product.ImageFileName = imageName; // Update the product's ImageFileName property
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Image uploaded successfully", ImageName = imageName });
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(string id)
        {
            // Extract and validate the token
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

            if (string.IsNullOrEmpty(token) || principal == null)
            {
                return Unauthorized(new { Message = "Invalid token" });
            }

            // Find the product by ID
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            // Remove the product from the context
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content response
        }




    }
}
