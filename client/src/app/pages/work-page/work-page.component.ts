import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Project } from 'src/app/shared/Project';
import { ProjectTask } from 'src/app/shared/Task';
import { ProjectWorker } from 'src/app/shared/Worker';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPage implements OnInit, OnDestroy {

  sub!: Subscription;
  tasks: ProjectTask[] =[];
  projects: Project[] = [];
  

  errorMessage: string ="";
  showArchived: boolean =false;


  states : string[]= ["To do","Expired","Completed", "Archived"];
  statesClasses: string[] =["fa fa-minus-circle toDo" , "fa fa-times-circle expired" ,"fa fa-check-circle completed", "fa fa-archive archive"];

  constructor(public storage : StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storage.role ==="Programmer"){
      this.sub = this.storage.loadTasks().subscribe({
        next: tasks => {
          this.tasks = tasks;
          for (let task of this.tasks){
            let deadline= new Date(task.deadline);

              if (deadline< new Date() && task.state==0){
                task.state=1;
              }
          }
          this.tasks.sort( function(a:ProjectTask, b: ProjectTask){
            return a.state-b.state;
          });
          
          console.log(this.tasks);
        },
        error: err => this.errorMessage = err
      });
    }
    else if (this.storage.role ==="Manager"){
      this.sub = this.storage.loadProjects().subscribe({
        next: projects => {
          this.projects = projects;
          for (let proj of this.projects){
            for (let task of proj.tasks){
              let deadline= new Date(task.deadline);
  
                if (deadline< new Date() && task.state==0){
                  task.state=1;
                }
            }
          }
          console.log('All: ', JSON.stringify(this.tasks))
        },
        error: err => this.errorMessage = err
      });
    }
      // this.storage.loadTasks().subscribe();
      // this.storage.loadProjects().subscribe();

  }

  archiveTask(task: ProjectTask): void{
    task.state=3;
    this.tasks.sort(function(a:ProjectTask, b: ProjectTask){
      return a.state-b.state;
    });
  }


  markAsDone(task: ProjectTask):void{
    task.state=2;
  }

  ToggleArchived(){
    this.showArchived= !this.showArchived;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    // save changes
    if(this.storage.role=== "Programmer"){
      this.storage.saveTasks(this.tasks).subscribe();
    }
  }


  editProj(p: Project){
    this.storage.projectToEdit=p;
    this.router.navigate(["/work/addProj"]);


  }

  addProj(){
    this.storage.projectToEdit= new Project();
    this.router.navigate(["/work/addProj"]);

  }

  showTask(task : ProjectTask){
    this.storage.task= task;
    this.router.navigate(["/work/task"]);
  }



  




}
