using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;

namespace TaskManager.Data
{
    public class ProjectsRepository : IProjectsRepository
    {
        private readonly ProjectsContext context;

        public ProjectsRepository(ProjectsContext context)
        {
            this.context = context;
        }
        public void AddEntity(object model)
        {
            this.context.Add(model);
        }


        public IEnumerable<ProjectTask> GetAllTasksByUser(string username)
        {
            return this.context.Tasks
                .Include(t=>t.ProjectIncludedIn)
                .Where(t => t.Responsible.UserName == username)
                .OrderBy(t=>t.Id)
                .ToList();
        }

        public IEnumerable<Project> GetProjectsByManager(string username)
        {
            return this.context.Projects
                .Include(p=>p.Manager)
                .Include(p=>p.Tasks)
                .ThenInclude(t=>t.Responsible)
                .Where(p => p.Manager.UserName == username)
                .ToList();
        }



        public IEnumerable<Worker> GetAllProgrammers()
        {
            return this.context.Workers
                .ToList();
        }

        public Worker GetProgrammer(string username)
        {
            return this.context.Workers
                .Include(w=>w.Tasks)
                .Where(w => w.UserName == username)
                .FirstOrDefault();
        }


        public ProjectTask GetTaskById(int id, string username)
        {
            return this.context.Tasks
                .Include(t => t.ProjectIncludedIn)
                .Where(t => t.Id == id && t.Responsible.UserName == username)
                .FirstOrDefault();
        }


        public Project GetProjectById(int id)
        {
            return this.context.Projects
                .Include(p => p.Tasks)
                .ThenInclude(t => t.Responsible)
                .Where(p => p.Id == id )
                .FirstOrDefault();
        }

        public Worker GetWorkerByName(string username)
        {
            return this.context.Workers
                .Include(w=> w.Tasks)
                .Where(w=>w.UserName== username).FirstOrDefault();
        }


        public bool SaveChanges()
        {
            return this.context.SaveChanges() > 0;
        }

        public bool updateTasks(string username, List<TaskViewModel> tasksToUpdate)
        {
            var tasks = this.context.Tasks.Where(t => t.Responsible.UserName == username)
                .OrderBy(t => t.Id)
                .ToList();

            var newTasksSorted = tasksToUpdate.OrderBy(t => t.Id).ToList();

            if (newTasksSorted.Count != tasks.Count)
                return false;

            for (int i =0; i< tasks.Count; i++)
            {
                if (tasks[i].Id == newTasksSorted[i].Id)
                    tasks[i].State = newTasksSorted[i].State;
                else
                    return false;
            }
            return this.SaveChanges();
        }

        public bool updateProj(Project newProj,int id, string userName)
        {
            var projToEdit = context.Projects
                .Include(p => p.Tasks)
                .ThenInclude(t => t.Responsible)
                .Where(p => p.Id == id && p.Manager.UserName == userName).FirstOrDefault();


            projToEdit.Tasks = newProj.Tasks;
            projToEdit.Budget = newProj.Budget;
            projToEdit.Name = newProj.Name;

            return this.SaveChanges();

        }

        public Project getProjByName(string name)
        {
            return this.context.Projects
                .Include(p => p.Tasks)
                .ThenInclude(t => t.Responsible)
                .Where(p => p.Name == name)
                .FirstOrDefault();
        }

        public int GetTotalTaksOrProj(string username, string role)
        {
            if (role== "Manager")
            {
                return context.Projects.Where(t => t.Manager.UserName== username).ToList().Count;

            }
            else if(role== "Programmer")
            {
                return context.Tasks.Where(t => t.Responsible.UserName == username).ToList().Count;
            }
            return -1;
        }

    }
}
