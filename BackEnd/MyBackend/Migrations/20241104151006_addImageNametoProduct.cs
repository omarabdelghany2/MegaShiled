using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class addImageNametoProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Products",
                newName: "ImageFileName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageFileName",
                table: "Products",
                newName: "Image");
        }
    }
}
