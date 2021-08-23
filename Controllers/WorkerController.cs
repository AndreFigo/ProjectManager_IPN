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
    public class WorkerController : Controller
    {
        private readonly IProjectsRepository repos;
        private readonly IMapper mapper;
        private readonly UserManager<Worker> userManager;

        public WorkerController(IProjectsRepository repos, IMapper mapper, UserManager<Worker> userManager)
        {
            this.repos = repos;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        public async Task<IActionResult> Get()
        {
            try
            {
                string username = User.Identity.Name;
                var worker = await userManager.FindByNameAsync(username);
                var roles = await userManager.GetRolesAsync(worker);
                var result = mapper.Map<RegisterViewModel>(worker);
                result.RoleName = roles[0];
                return Ok(result);
            }
            catch
            {
                return BadRequest("Failed to get worker info");
            }
        }


    }
}
