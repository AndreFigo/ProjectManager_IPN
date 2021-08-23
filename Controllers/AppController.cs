using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data;

namespace TaskManager.Controllers
{
    public class AppController : Controller
    {
        private readonly IProjectsRepository repos;

        public AppController(IProjectsRepository repos)
        {
            this.repos = repos;
        }

        public IActionResult Home() {
            return Ok();
        }

        //public IActionResult GetTasks()
        //{
        //    try
        //    {
        //        string username = User.Identity.Name;
        //        var tasks = repos.GetAllTasksByUser(username);
        //        return Ok(tasks);
        //    }
        //    catch
        //    {

        //    }
        //    }
    }
}
