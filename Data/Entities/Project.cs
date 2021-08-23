using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Data.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Budget { get; set; }
        public Worker Manager { get; set; }
        public string ManagerId { get; set; }
        public List<ProjectTask> Tasks{ get; set; }

    }
}
