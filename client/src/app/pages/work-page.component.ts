import { Component, OnDestroy, OnInit } from '@angular/core';
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Project } from '../shared/Project';
import { ProjectTask } from '../shared/Task';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPage implements OnInit, OnDestroy {

  sub!: Subscription;
  tasks: ProjectTask[] =[];
  // tasks: ProjectTask[] = [{
  // name:"front-end",
  // description:"do the front-end for this project d dawidnawd awidawd  dwada dad aw daw daw d",
  // projectIncludedInName:"Project 1",
  // responsibleUserName:"AndreFigo",
  // state:0,
  // deadline: new Date("1890-07-29T00:00:00")},{
  //   name:"front-end",
  //   description:"do the front-end for this project",
  //   projectIncludedInName:"Project 1",
  //   responsibleUserName:"AndreFigo",
  //   state:1,
  //   deadline: new Date("1890-07-29T00:00:00")},{
  //     name:"front-end",
  //     description:"do the front-end for this project",
  //     projectIncludedInName:"Project 1",
  //     responsibleUserName:"AndreFigo",
  //     state:2,
  //     deadline: new Date("1890-07-29T00:00:00")},{
  //       name:"front-end",
  //       description:"do the front-end for this project",
  //       projectIncludedInName:"Project 1",
  //       responsibleUserName:"AndreFigo",
  //       state:0,
  //       deadline: new Date("1890-07-29T00:00:00")},{
  //         name:"front-end",
  //         description:"do the front-end for this project",
  //         projectIncludedInName:"Project 1",
  //         responsibleUserName:"AndreFigo",
  //         state:0,
  //         deadline: new Date("1890-07-29T00:00:00")},{
  //           name:"front-end",
  //           description:"do the front-end for this project",
  //           projectIncludedInName:"Project 1",
  //           responsibleUserName:"AndreFigo",
  //           state:0,
  //           deadline: new Date("1890-07-29T00:00:00")},{
  //             name:"front-end",
  //             description:"do the front-end for this project",
  //             projectIncludedInName:"Project 1",
  //             responsibleUserName:"AndreFigo",
  //             state:0,
  //             deadline: new Date("1890-07-29T00:00:00")},{
  //               name:"front-end",
  //               description:"do the front-end for this project",
  //               projectIncludedInName:"Project 1",
  //               responsibleUserName:"AndreFigo",
  //               state:0,
  //               deadline: new Date("1890-07-29T00:00:00")},{
  //                 name:"front-end",
  //                 description:"do the front-end for this project",
  //                 projectIncludedInName:"Project 1",
  //                 responsibleUserName:"AndreFigo",
  //                 state:0,
  //                 deadline: new Date("1890-07-29T00:00:00")},{
  //                   name:"front-end",
  //                   description:"do the front-end for this project",
  //                   projectIncludedInName:"Project 1",
  //                   responsibleUserName:"AndreFigo",
  //                   state:0,
  //                   deadline: new Date("1890-07-29T00:00:00")},{
  //                     name:"front-end",
  //                     description:"do the front-end for this project",
  //                     projectIncludedInName:"Project 1",
  //                     responsibleUserName:"AndreFigo",
  //                     state:0,
  //                     deadline: new Date("1890-07-29T00:00:00")},{
  //                       name:"front-end",
  //                       description:"do the front-end for this project",
  //                       projectIncludedInName:"Project 1",
  //                       responsibleUserName:"AndreFigo",
  //                       state:0,
  //                       deadline: new Date("1890-07-29T00:00:00")},{
  //                         name:"front-end",
  //                         description:"do the front-end for this project",
  //                         projectIncludedInName:"Project 1",
  //                         responsibleUserName:"AndreFigo",
  //                         state:0,
  //                         deadline: new Date("1890-07-29T00:00:00")}];
  projects: Project[] = [];

  // projects: Project[] =[
  //   {
  //     name: "TaskManager",
  //     budget: 100,
  //     managerUserName: "Figowara",
  //     tasks: [
  //       {
  //         name: "front-end",
  //         description: "do the front-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "AndreFigo",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       },
  //       {
  //         name: "back-end",
  //         description: "do the back-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "FigoAndre",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       }
  //     ]
  //   },{
  //     name: "TaskManager",
  //     budget: 100,
  //     managerUserName: "Figowara",
  //     tasks: [
  //       {
  //         name: "front-end",
  //         description: "do the front-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "AndreFigo",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       },
  //       {
  //         name: "back-end",
  //         description: "do the back-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "FigoAndre",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       }
  //     ]
  //   },{
  //     name: "TaskManager",
  //     budget: 100,
  //     managerUserName: "Figowara",
  //     tasks: [
  //       {
  //         name: "front-end",
  //         description: "do the front-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "AndreFigo",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       },
  //       {
  //         name: "back-end",
  //         description: "do the back-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "FigoAndre",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       }
  //     ]
  //   },{
  //     name: "TaskManager",
  //     budget: 100,
  //     managerUserName: "Figowara",
  //     tasks: [
  //       {
  //         name: "front-end",
  //         description: "do the front-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "AndreFigo",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       },
  //       {
  //         name: "back-end",
  //         description: "do the back-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "FigoAndre",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       }
  //     ]
  //   },{
  //     name: "TaskManager",
  //     budget: 100,
  //     managerUserName: "Figowara",
  //     tasks: [
  //       {
  //         name: "front-end",
  //         description: "do the front-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "AndreFigo",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       },
  //       {
  //         name: "back-end",
  //         description: "do the back-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "FigoAndre",
  //         state: 0,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       }
  //     ]
  //   },{
  //     name: "TaskManager",
  //     budget: 100,
  //     managerUserName: "Figowara",
  //     tasks: [
  //       {
  //         name: "front-end",
  //         description: "do the front-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "AndreFigo",
  //         state: 2,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       },
  //       {
  //         name: "back-end",
  //         description: "do the back-end for this project",
  //         projectIncludedInName:"TaskManager",
  //         responsibleUserName: "FigoAndre",
  //         state: 1,
  //         deadline: new Date("1890-07-29T00:00:00")
  //       }
  //     ]
  //   }
  // ];

  errorMessage: string ="";
  showArchived: boolean =false;

  states : string[]= ["To do","Expired","Completed"];
  statesClasses: string[] =["fa fa-minus-circle toDo" , "fa fa-times-circle expired" ,"fa fa-check-circle completed"];

  constructor(public storage : StorageService) { }

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
          
        },
        error: err => this.errorMessage = err
      });
    }
    else if (this.storage.role ==="Manager"){
      this.sub = this.storage.loadProjects().subscribe({
        next: projects => {
          this.projects = projects;
          for (let proj of this.projects){
              console.log(proj.name);
          }
          console.log('All: ', JSON.stringify(this.tasks))
        },
        error: err => this.errorMessage = err
      });
    }
      // this.storage.loadTasks().subscribe();
      // this.storage.loadProjects().subscribe();

  }

  deleteTask(task: ProjectTask): void{
    this.tasks = this.tasks.filter(t => t !== task);
  }


  markAsDone(task: ProjectTask):void{
    task.state=2;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
    // save changes
    if(this.storage.role=== "Programmer"){
      //this.storage.saveTasks(this.tasks).subscribe();
    }
  }

  updateTasks(): void{
    console.log("clicked");
  }


}
