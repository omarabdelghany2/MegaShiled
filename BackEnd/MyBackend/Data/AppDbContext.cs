using Microsoft.EntityFrameworkCore;
using MyBackend.Models;  // Import your models namespace

namespace MyBackend.Data  // Namespace should reflect your project's structure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Define DbSets for each model (tables in the database)
        public DbSet<Slide> Slides { get; set; }  // Add this line

        // Optionally, override OnModelCreating for advanced configurations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Slide entity
            modelBuilder.Entity<Slide>()
                .Property(s => s.Name)
                .IsRequired(); // Name cannot be null or empty

            modelBuilder.Entity<Slide>()
                .Property(s => s.Image)
                .IsRequired(); // Image cannot be null or empty
            modelBuilder.Entity<Slide>()
                .HasIndex(s => s.Name)
                .IsUnique(); // This line ensures the Name is unique        
        }
    }
}
