﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyBackend.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MyBackend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

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

            modelBuilder.Entity("MyBackend.Models.Slide", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsAdditional")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
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
