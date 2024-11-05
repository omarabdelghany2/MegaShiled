using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    _id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Colors = table.Column<string[]>(type: "text[]", nullable: false),
                    Featured = table.Column<bool>(type: "boolean", nullable: false),
                    FreeShipping = table.Column<bool>(type: "boolean", nullable: false),
                    Inventory = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x._id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
