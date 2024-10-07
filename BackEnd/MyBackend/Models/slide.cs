namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
        public class Slide
    {
        public int Id { get; set; }  // Auto-generated ID
        public required string Name { get; set; }  // Name of the slide
        public required string Image { get; set; }  // URL or path to the image
    }
}
