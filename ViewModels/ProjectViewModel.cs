using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data.Entities;

namespace TaskManager.ViewModels
{
    public class ProjectViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Budget { get; set; }
        [Required]
        public string ManagerUserName { get; set; }
        [Required]
        public ICollection<TaskViewModel> Tasks { get; set; }
    }
}
