namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
    public class Slide
    {
        public int Id { get; set; }  // Auto-generated ID
        public required string Name { get; set; }  // Name of the slide
        public string arabicName { get; set; } = "No Arabic Name"; 
        // public required string Image { get; set; }  // URL or path to the image
        public required bool IsAdditional { get; set; }  // Indicates if this is an additional slide
    }

    public class SlideResponse
    {
        public int Count { get; set; }  // The total number of slides
        public IEnumerable<Slide> MainServices { get; set; }  // The list of slides
    }
}



