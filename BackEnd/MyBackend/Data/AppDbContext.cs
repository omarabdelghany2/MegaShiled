using Microsoft.EntityFrameworkCore;
using MyBackend.Models;  // Import your models namespace

namespace MyBackend.Data  // Namespace should reflect your project's structure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Slide> Slides { get; set; }  // DbSet for Slide entity
        public DbSet<Package> Packages { get; set; }  // DbSet for Package entity

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Slide entity
            modelBuilder.Entity<Slide>()
                .Property(s => s.Name)
                .IsRequired();

            modelBuilder.Entity<Slide>()
                .Property(s => s.Image)
                .IsRequired();

            modelBuilder.Entity<Slide>()
                .HasIndex(s => s.Name)
                .IsUnique();

            // Configure the Package entity
            modelBuilder.Entity<Package>()
                .HasKey(p => p._id);  // Set _id as the primary key

            modelBuilder.Entity<Package>()
                .Property(p => p._id)
                .IsRequired();  // _id cannot be null or empty

            modelBuilder.Entity<Package>()
                .HasIndex(p => p._id)
                .IsUnique();  // Ensure _id is unique

            modelBuilder.Entity<Package>()
                .Property(p => p.__v)
                .IsRequired();  // __v (version) cannot be null or empty

            modelBuilder.Entity<Package>()
                .Property(p => p.name)
                .IsRequired();  // Name cannot be null or empty

            modelBuilder.Entity<Package>()
                .Property(p => p.belongTo)
                .IsRequired();  // belongTo cannot be null or empty

            modelBuilder.Entity<Package>()
                .Property(p => p.description)
                .IsRequired();  // description cannot be null or empty

            // Ensure the name is unique within the Package table (optional)
            modelBuilder.Entity<Package>()
                .HasIndex(p => p.name)
                .IsUnique();
            modelBuilder.Entity<Package>()
                .Property(p => p.description)
                .HasColumnType("text[]"); // Specify that this should be a PostgreSQL text array

                        
        }
    }
}
