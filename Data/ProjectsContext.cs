using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data.Entities;

namespace TaskManager.Data
{
    public class ProjectsContext : IdentityDbContext<Worker>
    {
        public ProjectsContext(DbContextOptions<ProjectsContext> opt) : base(opt)
        {

        }

        public DbSet<Worker> Workers { get; set; }
        public DbSet<ProjectTask> Tasks { get; set; }
        public DbSet<Project> Projects { get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.Entity<IdentityRole>().HasData(
        //        new IdentityRole { Name = "Programmer"},
        //        new IdentityRole { Name = "Manager" }
        //    );
        //}

    }
}
