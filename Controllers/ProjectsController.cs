using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data;
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

        public ProjectsController(IProjectsRepository repos, IMapper mapper)
        {
            this.repos = repos;
            this.mapper = mapper;
        }

        public IActionResult Get()
        {
            try
            {
                string username = User.Identity.Name;
                var projs = repos.GetProjectsByManager(username);
                return Ok(mapper.Map<IEnumerable<ProjectViewModel>>(projs));
            }
            catch
            {
                return BadRequest("Failed to get tasks");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var proj = repos.GetProjectById(id, User.Identity.Name);

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
    }
}
