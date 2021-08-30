import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';
import { Project } from 'src/app/shared/Project';
import { ProjectTask } from 'src/app/shared/Task';
import { ProjectWorker } from 'src/app/shared/Worker';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  newProject : Project = new Project();

  taskToEdit: ProjectTask = new ProjectTask();

  programmers: ProjectWorker[] =[];

  edit: boolean=false;
  showTask:boolean=false;
  showAddProgrammer:boolean=false;
  newTask:boolean=false;

  errorMessage: string ="";
  showAddWindow : boolean= false;
  states : string[]= ["To do","Expired","Completed", "Archived"];
  statesClasses: string[] =["fa fa-minus-circle toDo" , "fa fa-times-circle expired" ,"fa fa-check-circle completed", "fa fa-archive archive"];


  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.edit=false;

    this.newProject= this.storage.projectToEdit;
    this.storage.getAllProgrammers().subscribe({
          next: programmers => {
            this.programmers = programmers;
          },
          error: err => this.errorMessage = err
        });
  }

  editProj(p: Project){
    this.edit=true;
    this.newProject=p;

  }

  deadlineIsValid(): boolean{
    return new Date(this.taskToEdit.deadline )> new Date();
  }

  addTask(){
    this.newTask=true;
    this.showTask=true;
    this.taskToEdit= new ProjectTask();
    this.taskToEdit.projectIncludedInId= this.newProject.id;
    this.taskToEdit.projectIncludedInName= this.newProject.name;
  }


  editTask(t: ProjectTask){
    this.newTask=false;
    this.showTask=true;
    this.taskToEdit= t;
    
  }

  saveTask(){
    if(this.taskToEdit.state===1){
      this.taskToEdit.state=0;
    }
    if (this.newTask){
      this.newProject.tasks.push(this.taskToEdit);
    }
    else{
      let index = this.newProject.tasks.findIndex(x => x.name === this.taskToEdit.name);
      this.newProject.tasks[index]= this.taskToEdit;

    }
    this.showTask=false;
  }


  addProgrammer(){
    this.showAddProgrammer=true;
  }

  selectProg(p: ProjectWorker){
    this.taskToEdit.responsibleUserName=p.username;
    this.showAddProgrammer=false;
  }

  addProjWindow(){
    this.showAddWindow= true;
  }

  closeProjWindow(){
    this.showAddWindow= false;
  }


  addProj(): void{
    this.storage.addProject(this.newProject).subscribe();
    alert("Saving project");
    this.router.navigate(["/work"]);
  }

}
