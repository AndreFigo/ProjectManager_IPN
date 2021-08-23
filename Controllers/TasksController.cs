using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Data;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;

namespace TaskManager.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TasksController : Controller
    {
        private readonly IProjectsRepository repos;
        private readonly IMapper mapper;

        public TasksController(IProjectsRepository repos, IMapper mapper)
        {
            this.repos = repos;
            this.mapper = mapper;
        }

        public IActionResult Get()
        {
            try
            {
                string username = User.Identity.Name;
                var tasks = repos.GetAllTasksByUser(username);
                return Ok(mapper.Map<IEnumerable<TaskViewModel>>(tasks));
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
                var task = repos.GetTaskById(id, User.Identity.Name);

                if (task != null)
                {
                    return Ok(mapper.Map<ProjectTask, TaskViewModel>(task));
                }
                else
                    return NotFound();
            }
            catch 
            {
                //logger.LogError($"Failed to get orders; {ex}");
                return BadRequest("Failed to get task");
            }
        }


        public IActionResult Put(List<TaskViewModel> tasks) 
        {
            if (ModelState.IsValid) { 
                string username = User.Identity.Name;
                if (repos.updateTasks(username, tasks) )
                {
                    return Ok("Tasks saved");
                }
                 
            }
            return BadRequest("Failed to save tasks");
            
        }

    }
}
