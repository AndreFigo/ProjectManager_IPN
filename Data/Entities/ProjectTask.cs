using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Data.Entities
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Project ProjectIncludedIn { get; set; }
        public int ProjectId { get; set; }
        public Worker Responsible { get; set; }
        public string ResponsibleUserName { get; set; }
        public int State { get; set; }
        public DateTime Deadline { get; set; }




    }
}
