namespace MyBackend.Models  // Change 'MyBackend' to match your project's namespace
{
    public class Product
    {
        public Product()
        {
            Featured = false;      // Default value for featured
            FreeShipping = false;  // Default value for freeShipping
            Inventory = 10;         // Default value for inventory
            Colors = ["green","red","blue"];
        }

        public string? id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }               // Product name
        public int Price { get; set; }                 // Product price
        public string Description { get; set; }        // Product description
        public string ImageFileName { get; set; }// Required and will match the uploaded image name
        public string[] Colors { get; set; }           // Array of colors
        public bool Featured { get; set; }             // Whether the product is featured
        public bool FreeShipping { get; set; }         // Whether the product has free shipping
        public int Inventory { get; set; }              // Product inventory
    }
}
