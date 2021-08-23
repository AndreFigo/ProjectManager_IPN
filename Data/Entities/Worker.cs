using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Data.Entities
{
    public class Worker : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<ProjectTask> Tasks { get; set; }
        public IdentityRole Role { get; set; }

    }
}
