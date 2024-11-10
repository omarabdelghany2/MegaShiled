﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyBackend.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MyBackend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241108060233_MakeArabicNamearabicname")]
    partial class MakeArabicNamearabicname
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("MyBackend.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("JwtToken")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("MyBackend.Models.Book", b =>
                {
                    b.Property<string>("_id")
                        .HasColumnType("text");

                    b.Property<string>("CarSize")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CustomerFname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CustomerLname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CustomerPhone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Date")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string[]>("Services")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<int>("__v")
                        .HasColumnType("integer");

                    b.Property<bool>("isCompleted")
                        .HasColumnType("boolean");

                    b.HasKey("_id");

                    b.HasIndex("_id")
                        .IsUnique();

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("MyBackend.Models.Package", b =>
                {
                    b.Property<string>("_id")
                        .HasColumnType("text");

                    b.Property<int>("__v")
                        .HasColumnType("integer");

                    b.Property<string>("belongTo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("bigPrice")
                        .HasColumnType("integer");

                    b.Property<string[]>("description")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<int>("mediumPrice")
                        .HasColumnType("integer");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("smallPrice")
                        .HasColumnType("integer");

                    b.HasKey("_id");

                    b.HasIndex("_id")
                        .IsUnique();

                    b.HasIndex("name")
                        .IsUnique();

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("MyBackend.Models.Product", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("text");

                    b.Property<string[]>("Colors")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Featured")
                        .HasColumnType("boolean");

                    b.Property<bool>("FreeShipping")
                        .HasColumnType("boolean");

                    b.Property<string>("ImageFileName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Inventory")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Price")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("MyBackend.Models.Slide", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsAdditional")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("arabicName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Slides");
                });
#pragma warning restore 612, 618
        }
    }
}
