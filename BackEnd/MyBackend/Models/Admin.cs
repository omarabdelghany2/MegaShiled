namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
    public class Admin
    {
        public int Id { get; set; } // Unique identifier for each admin
        public required string Name { get; set; }  // Required
        public required string Password { get; set; }  // Required
        public string? JwtToken { get; set; }  // Optional (nullable)
        public required string Email {get; set; } 

        public Admin() { }
    }


    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }


    
}

