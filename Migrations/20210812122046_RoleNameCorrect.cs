using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class RoleNameCorrect : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_WorkerRoleId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "WorkerRoleId",
                table: "AspNetUsers",
                newName: "RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_WorkerRoleId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_RoleId",
                table: "AspNetUsers",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_RoleId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "AspNetUsers",
                newName: "WorkerRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_RoleId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_WorkerRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_WorkerRoleId",
                table: "AspNetUsers",
                column: "WorkerRoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
