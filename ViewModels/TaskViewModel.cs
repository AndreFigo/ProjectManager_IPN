using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data.Entities;

namespace TaskManager.ViewModels
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ProjectIncludedInName { get; set; }
        [Required]
        public int ProjectIncludedInId { get; set; }

        [Required]
        public string ResponsibleUserName { get; set; }

        [Required]
        public int State { get; set; }
        [Required]
        public DateTime Deadline { get; set; }

    }
}
