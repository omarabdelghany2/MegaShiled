using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class ConfigurePackageDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    _id = table.Column<string>(type: "text", nullable: false),
                    __v = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    belongTo = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string[]>(type: "text[]", nullable: false),
                    smallPrice = table.Column<int>(type: "integer", nullable: false),
                    mediumPrice = table.Column<int>(type: "integer", nullable: false),
                    bigPrice = table.Column<int>(type: "integer", nullable: false),
                    isAdditional = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x._id);
                });

            migrationBuilder.CreateTable(
                name: "Slides",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slides", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Packages__id",
                table: "Packages",
                column: "_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Packages_name",
                table: "Packages",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Slides_Name",
                table: "Slides",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "Slides");
        }
    }
}
