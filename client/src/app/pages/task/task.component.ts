import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProjectTask } from 'src/app/shared/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  states : string[]= ["To do","Expired","Completed", "Archived"];
  statesClasses: string[] =["fa fa-minus-circle toDo" , "fa fa-times-circle expired" ,"fa fa-check-circle completed", "fa fa-archive archive"];


  task: ProjectTask= new ProjectTask();

  constructor(public storage:StorageService) { }

  ngOnInit(): void {
    this.task= this.storage.task;
  }

}
