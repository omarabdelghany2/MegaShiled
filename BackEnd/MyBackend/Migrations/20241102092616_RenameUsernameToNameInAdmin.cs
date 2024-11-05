using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class RenameUsernameToNameInAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Admins",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Admins",
                newName: "Username");
        }
    }
}
