import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProjectWorker } from 'src/app/shared/Worker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  worker : ProjectWorker= new ProjectWorker();

  errorMessage: string ="";


  roleIcons = ["fa-id-badge","fa-desktop"];
  workType = ["Projects", "Tasks"];

  roleIndex(): number{
    if (this.worker.roleName=="Manager")
    {
      return 0;
    }
    else if (this.worker.roleName=="Programmer")
    {
      return 1;
    }
    return -1;
  }

  constructor(public storage: StorageService) { }

  ngOnInit(): void {
    this.storage.loadWorkerInfo(this.storage.username).subscribe({
      next: worker => {
        this.worker = worker;
      },
      error: err => this.errorMessage = err
    });
  }

}
