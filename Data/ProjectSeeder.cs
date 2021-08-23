using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TaskManager.Controllers;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;


namespace TaskManager.Data
{
    public class ProjectSeeder
    {
        private readonly ProjectsContext context;
        private readonly UserManager<Worker> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IWebHostEnvironment env;
        private readonly IMapper mapper;

        public ProjectSeeder(ProjectsContext context,UserManager<Worker> userManager, RoleManager<IdentityRole> roleManager, IWebHostEnvironment env, IMapper mapper)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.env = env;
            this.mapper = mapper;
        }


        public async Task Seed()
        {
            context.Database.EnsureCreated();


            IdentityRole managerRole = await CreateRole("Manager");
            IdentityRole programmerRole = await CreateRole("Programmer");

            if (managerRole == null || programmerRole == null)
                return;


            if (!context.Workers.Any())
            {
                var filePath = Path.Combine(env.ContentRootPath, "Data/workers.json");
                var jsonFile = File.ReadAllText(filePath);
                var workers = JsonSerializer.Deserialize<IEnumerable<RegisterViewModel>>(jsonFile);


                foreach (var w in workers)
                {
                    int result= await GenerateWorker(w);
                    if (result==0)
                    {
                        //error generating user
                    }
                }
            }

            
            if (!context.Projects.Any())
            {
                var filePath = Path.Combine(env.ContentRootPath, "Data/projects.json");
                var jsonFile = File.ReadAllText(filePath);
                var projects = JsonSerializer.Deserialize<IEnumerable<ProjectViewModel>>(jsonFile);

                foreach (var p in projects)
                {
                    int result = await GenerateProject(p);
                    if (result == 0)
                    {
                        //error generating user
                    }
                }
            }


            context.SaveChanges();

        }

        private async Task<int> GenerateProject(ProjectViewModel p)
        {
            var newManager = await userManager.FindByNameAsync(p.ManagerUserName);
            if (newManager == null)
                return 0;
            var newProj = new Project
            {
                Name = p.Name,
                Budget = p.Budget,
                Manager = newManager,
                Tasks = (List<ProjectTask>)mapper.Map<IEnumerable<ProjectTask>>(p.Tasks)
            };
            for( int i=0; i< newProj.Tasks.Count;i++)
            {
                var t = newProj.Tasks[i];
                var responsible = await userManager.FindByNameAsync(t.ResponsibleUserName);
                if (responsible!=null)
                    t.Responsible = responsible;
                else
                {
                    newProj.Tasks.Remove(t);
                }
            }
            context.Projects.Add(newProj);
            return 1;
        }

        private async Task<int> GenerateWorker(RegisterViewModel w)
        {
            var newRole = await roleManager.FindByNameAsync(w.RoleName);
            if (newRole == null)
                return 0;

            var newWorker = new Worker
            {
                UserName = w.Username,
                FirstName = w.FirstName,
                LastName = w.LastName,
                //Role= newRole,
                Email = w.Email
            };
            var result = await userManager.CreateAsync(newWorker, w.Password);
            await userManager.AddToRoleAsync(newWorker, w.RoleName);
            if (result != IdentityResult.Success)
                return 0;
            return 1;
        }

        private async Task<IdentityRole> CreateRole(string roleName)
        {
            var newRole = await roleManager.FindByNameAsync(roleName);
            if (newRole == null)
            {
                newRole = new IdentityRole
                {
                    Name = roleName
                };
                var res = await roleManager.CreateAsync(newRole);
                if (res == null)
                {
                    throw new InvalidOperationException("Could not create new role in seeder");
                }
            }
            return newRole;
        }
    }
}
