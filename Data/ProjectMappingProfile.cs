using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;

namespace TaskManager.Data
{
    public class ProjectMappingProfile : Profile
    {
        public ProjectMappingProfile()
        {
            CreateMap<ProjectTask, TaskViewModel>().ReverseMap()
                .ForMember(t => t.Responsible, opt => opt.Ignore())
                .ForMember(t => t.ProjectIncludedIn, opt => opt.Ignore());

            CreateMap<Project, ProjectViewModel>().ReverseMap()
                .ForMember(t => t.Manager, opt => opt.Ignore());

            CreateMap<Worker, RegisterViewModel>()
                .ForMember(r=>r.RoleName, opt => opt.MapFrom(w=>w.Role.Name))
                .ReverseMap()
                .ForMember(t => t.Role, opt => opt.Ignore())
                .ForMember(t => t.Tasks, opt => opt.Ignore());
        }
    }
}
