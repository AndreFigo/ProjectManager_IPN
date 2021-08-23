using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class viewModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_ManagerId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ManagerId",
                table: "Projects");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1bf0c193-02e4-45cc-8679-a93ea3c597a2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8a0e168-d1d4-406d-85c3-1759a183e784");

            migrationBuilder.AlterColumn<int>(
                name: "ManagerId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManagerId1",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b5807ee0-be53-49e9-85fc-bae6d8a6bf1c", "79401b9c-79b2-42d4-9106-d092ff5f41fb", "Programmer", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "746b3979-8eeb-4066-a153-9fdb7bb8810e", "7109b987-9b85-4e01-a26c-61456de6613b", "Manager", null });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ManagerId1",
                table: "Projects",
                column: "ManagerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_ManagerId1",
                table: "Projects",
                column: "ManagerId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_ManagerId1",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ManagerId1",
                table: "Projects");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "746b3979-8eeb-4066-a153-9fdb7bb8810e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b5807ee0-be53-49e9-85fc-bae6d8a6bf1c");

            migrationBuilder.DropColumn(
                name: "ManagerId1",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "ManagerId",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f8a0e168-d1d4-406d-85c3-1759a183e784", "80ed119d-e695-4a4d-90b3-94edfdff315e", "Programmer", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1bf0c193-02e4-45cc-8679-a93ea3c597a2", "65b9b5a7-f761-427c-be43-d2ec86c5c9df", "Manager", null });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ManagerId",
                table: "Projects",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_ManagerId",
                table: "Projects",
                column: "ManagerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
