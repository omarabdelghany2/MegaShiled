using Microsoft.AspNetCore.Http; // Required for IFormFile

namespace MyBackend.DTOs // Ensure the namespace matches your project structure
{
    public class SlideUploadDto
    {
        public string Name { get; set; } // Slide name
        // public IFormFile Image { get; set; } // Image file
        public bool IsAdditional { get; set; } // New field to indicate if slide is additional
        public string arabicName { get; set; } = "No Arabic Name"; 

    }


        public class SlideRequestDto
    {
        public SlideUploadDto Slide { get; set; } // The DTO for slide details
    }
}
