using Microsoft.EntityFrameworkCore;
using MyBackend.Models;  // Import your models namespace

namespace MyBackend.Data  // Namespace should reflect your project's structure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Slide> Slides { get; set; }  // DbSet for Slide entity
        public DbSet<Package> Packages { get; set; }  // DbSet for Package entity
        public DbSet<Book> Bookings { get; set; }  // DbSet for Book entity
        public DbSet<Admin> Admins { get; set; }  // Add this line
        public DbSet<Product> Products { get; set; } // New DbSet for Product


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Slide entity
            modelBuilder.Entity<Slide>()
                .Property(s => s.Name)
                .IsRequired();


            modelBuilder.Entity<Slide>()
                .Property(s => s.arabicName)
                .IsRequired();    

            // modelBuilder.Entity<Slide>()
            //     .Property(s => s.Image)
            //     .IsRequired();

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
                .Property(p => p.arabicName)
                .IsRequired();  // Name cannot be null or empty    

            modelBuilder.Entity<Package>()
                .Property(p => p.belongTo)
                .IsRequired();  // belongTo cannot be null or empty

            modelBuilder.Entity<Package>()
                .Property(p => p.description)
                .IsRequired();  // description cannot be null or empty

            modelBuilder.Entity<Package>()
                .HasIndex(p => p.name)
                .IsUnique();

            modelBuilder.Entity<Package>()
                .Property(p => p.description)
                .HasColumnType("text[]"); // Specify that this should be a PostgreSQL text array

            modelBuilder.Entity<Package>()
                .Property(p => p.arabicDescription)
                .HasColumnType("text[]"); // Specify that this should be a PostgreSQL text array
            // Configure the Book entity
            modelBuilder.Entity<Book>()
                .HasKey(b => b._id);  // Set _id as the primary key

            modelBuilder.Entity<Book>()
                .Property(b => b._id)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .HasIndex(b => b._id)
                .IsUnique();

            modelBuilder.Entity<Book>()
                .Property(b => b.__v)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .Property(b => b.CustomerFname)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .Property(b => b.CustomerLname)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .Property(b => b.CustomerPhone)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .Property(b => b.Services)
                .HasColumnType("text[]")  // Store as a text array in PostgreSQL
                .IsRequired();  // Ensure that Services is not null

            modelBuilder.Entity<Book>()
                .Property(b => b.City)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .Property(b => b.Date)
                .IsRequired();

            modelBuilder.Entity<Book>()
                .Property(b => b.CarSize)
                .IsRequired();
            modelBuilder.Entity<Product>()
                .HasKey(p => p.id); // Set _id as the primary key                

            modelBuilder.Entity<Product>()
                .Property(c => c.Name)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(c => c.Price)
                .IsRequired();
            modelBuilder.Entity<Product>()
                .Property(c => c.Description)
                .IsRequired();
            modelBuilder.Entity<Product>()
                .Property(c => c.Colors)
                .HasColumnType("text[]"); // Specify that Colors should be a PostgreSQL text array        

        }
    }
}
