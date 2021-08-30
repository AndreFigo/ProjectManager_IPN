import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Project } from 'src/app/shared/Project';
import { ProjectTask } from 'src/app/shared/Task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project : Project= new Project();

  errorMessage : string ="";

  states : string[]= ["To do","Expired","Completed", "Archived"];
  statesClasses: string[] =["fa fa-minus-circle toDo" , "fa fa-times-circle expired" ,"fa fa-check-circle completed", "fa fa-archive archive"];


  constructor(public storage : StorageService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.storage.loadProject(id).subscribe({
      next: project => {
        this.project = project;
      },
      error: err => this.errorMessage = err
    });
  }

  showTask(task : ProjectTask){
    this.storage.task= task;
    this.router.navigate(["/work/task"]);
  }
}
