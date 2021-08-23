using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class roles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "aaefd890-27f6-4048-b06b-e378980d95a8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "21358f53-bd31-4539-8129-594363c708ba", "537d60ff-2032-4fd2-80ff-aeab310c9d61", "Programmer", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "80710294-0c75-43f1-8a7e-d62db494cfdd", "e17ca954-6171-4519-bc4c-2362df6123ef", "Manager", null });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "WorkerRoleId" },
                values: new object[] { "1b80318f-1c9a-420a-940e-d3f8669dbe14", 0, "ba38f743-b9cd-4e74-8edf-787b76db8fc1", null, false, "André", "Figo", false, null, null, null, null, null, false, "a3f892ce-0b60-44dd-be4c-2a8fc2a956fb", false, null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21358f53-bd31-4539-8129-594363c708ba");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "80710294-0c75-43f1-8a7e-d62db494cfdd");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1b80318f-1c9a-420a-940e-d3f8669dbe14");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "WorkerRoleId" },
                values: new object[] { "aaefd890-27f6-4048-b06b-e378980d95a8", 0, "e4f438be-7d14-4ab7-8d44-f07f36251c1d", null, false, "André", "Figo", false, null, null, null, null, null, false, "4f995f86-3a7d-485b-89e5-d38950b8a971", false, null, null });
        }
    }
}
