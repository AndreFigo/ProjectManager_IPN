using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class beginSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "746b3979-8eeb-4066-a153-9fdb7bb8810e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b5807ee0-be53-49e9-85fc-bae6d8a6bf1c");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b5807ee0-be53-49e9-85fc-bae6d8a6bf1c", "79401b9c-79b2-42d4-9106-d092ff5f41fb", "Programmer", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "746b3979-8eeb-4066-a153-9fdb7bb8810e", "7109b987-9b85-4e01-a26c-61456de6613b", "Manager", null });
        }
    }
}
