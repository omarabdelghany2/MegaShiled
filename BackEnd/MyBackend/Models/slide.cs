namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
        public class Slide
    {
        public int Id { get; set; }  // Auto-generated ID
        public required string Name { get; set; }  // Name of the slide
        public required string Image { get; set; }  // URL or path to the image
        public required bool IsAdditional { get; set; }  // New property
    }



    public class SlideResponse
{
    public int Count { get; set; } // The total number of slides
    public IEnumerable<Slide> MainServices { get; set; } // The array of slides
}
}


