namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
    public class Book
    {
        public Book() // Corrected constructor name to match the class name
        {
            _id = Guid.NewGuid().ToString(); // Automatically generate _id
            __v = 0; // Initialize __v to 0
        }

        public string _id { get; private set; }  // Private set to prevent manual assignment
        public int __v { get; private set; } // Private set to prevent manual assignment
        public string CustomerFname { get; set; }
        public string CustomerLname { get; set; }
        public string CustomerPhone { get; set; }
        public string[] Services { get; set; } = Array.Empty<string>();  // Dynamic array of strings
        public string City { get; set; }
        public string Date { get; set; }
        public string CarSize { get; set; }
        public bool isCompleted{ get; set; }
    }

    public class BookResponse  // Fixed spelling if it was misspelled
    {
        public int Count { get; set; } // The total number of bookings
        public IEnumerable<Book> Bookings { get; set; } // The array of bookings
    }

        public class MarkBookingAsCompletedRequest
    {
        public bool isCompleted { get; set; }
    }
}
