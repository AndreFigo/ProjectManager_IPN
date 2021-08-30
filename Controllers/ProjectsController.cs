using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;

namespace TaskManager.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ProjectsController : Controller
    {
        private readonly IProjectsRepository repos;
        private readonly IMapper mapper;
        private readonly UserManager<Worker> userManager;

        public ProjectsController(IProjectsRepository repos, IMapper mapper, UserManager<Worker> userManager)
        {
            this.repos = repos;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        public IActionResult Get()
        {
            try
            {
                string username = User.Identity.Name;
                var projs = repos.GetProjectsByManager(username);
                var projsToSend = mapper.Map<IEnumerable<ProjectViewModel>>(projs);
                return Ok(projsToSend);
            }
            catch
            {
                return BadRequest("Failed to get tasks");
            }
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var proj = repos.GetProjectById(id);

                if (proj != null)
                {
                    return Ok(mapper.Map<ProjectViewModel>(proj));
                }
                else
                    return NotFound();
            }
            catch
            {
                //logger.LogError($"Failed to get orders; {ex}");
                return BadRequest("Failed to get project");
            }
        }



        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> Post(ProjectViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentUser = await userManager.FindByNameAsync(User.Identity.Name);
                   

                    var newProj = new Project
                    {
                        
                        Name = model.Name,
                        Budget = model.Budget,
                        Manager = currentUser,
                        Tasks = (List<ProjectTask>)mapper.Map<IEnumerable<ProjectTask>>(model.Tasks)
                    };

                    for (int i = 0; i < newProj.Tasks.Count; i++)
                    {
                        var t = newProj.Tasks[i];
                        var responsible = await userManager.FindByNameAsync(t.ResponsibleUserName);
                        if (responsible != null)
                            t.Responsible = responsible;
                        else
                        {
                            newProj.Tasks.Remove(t);
                        }
                    }



                    //find project with that id
                    var oldP = repos.GetProjectById(model.Id);

                    if (oldP == null)
                    {

                        var repeated = repos.getProjByName(model.Name);

                        if (repeated== null)
                        {
                        repos.AddEntity(newProj);
                            if (repos.SaveChanges())
                            {
                                var vm = mapper.Map<ProjectViewModel>(newProj);
                                return Created($"/projects/{vm.Id}", vm);
                            }
                        }
                        else
                        {
                            return BadRequest("Repeated project name");
                        }
                        
                    }
                    else
                    {
                        if (repos.updateProj(newProj, model.Id,currentUser.UserName))
                        {
                            var vm = mapper.Map<ProjectViewModel>(newProj);
                            return Created($"/projects/{vm.Id}", vm);
                        }
                        else
                            return BadRequest("Could not update project");
                    }



                   
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed: exception {ex}");
            }
            return BadRequest("Failed to save new project");
        }
    }

}
