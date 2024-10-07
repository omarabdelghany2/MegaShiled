using Microsoft.AspNetCore.Http; // Required for IFormFile

namespace MyBackend.DTOs // Ensure the namespace matches your project structure
{
    public class SlideUploadDto
    {
        public string Name { get; set; } // Slide name
        public IFormFile Image { get; set; } // Image file
    }
}
