
namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
    public class Package
    {
        public Package()
        {
            _id = Guid.NewGuid().ToString(); // Automatically generate _id
            __v = 0; // Initialize __v to 0
        }

        public string _id { get; private set; }  // Private set to prevent manual assignment
        public int __v { get; private set; } // Private set to prevent manual assignment
        public string name { get; set; }
        public string arabicName { get; set; }="No Arabic Name"; 
        public string belongTo { get; set; }
        public string[] description { get; set; } = new string[3];  // Array of 3 strings
        public string[] arabicDescription { get; set; } = new string[] { "Default 1", "Default 2", "Default 3" };
        public int smallPrice { get; set; }
        public int mediumPrice { get; set; }
        public int bigPrice { get; set; }
    }






    public class PackageResponse  // Fix the spelling if it was misspelled
    {
        public int Count { get; set; } // The total number of packages
        public IEnumerable<Package> Packages { get; set; } // The array of packages
    }



    public class PackagePatchModel
    {
        // Make the properties nullable to allow optional updates
        public string ? name { get; set; }
        public string ? arabicName { get; set; }
        public string[] ? description { get; set; } // This is an array, can be null if not provided
        public string[] ? arabicDescription { get; set; } // This is an array, can be null if not provided
        public int? smallPrice { get; set; } // Use nullable int for optional numeric fields
        public int? mediumPrice { get; set; }
        public int? bigPrice { get; set; }

        // No belongTo property as it's required in the original model
    }
}
