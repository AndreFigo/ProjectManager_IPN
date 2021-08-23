using System.Collections.Generic;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;

namespace TaskManager.Data
{
    public interface IProjectsRepository
    {
        void AddEntity(object model);
        IEnumerable<Worker> GetAllProgrammers();
        IEnumerable<ProjectTask> GetAllTasksByUser(string username);
        Project GetProjectById(int id, string username);
        IEnumerable<Project> GetProjectsByManager(string username);
        ProjectTask GetTaskById(int id, string username);
        Worker GetWorkerByName(string username);
        bool SaveChanges();
        bool updateTasks(string username, List<TaskViewModel> tasks);
    }
}