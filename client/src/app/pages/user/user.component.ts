import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ProjectWorker } from 'src/app/shared/Worker';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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

  constructor(public storage: StorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const username = String(this.route.snapshot.paramMap.get('username'));
    this.storage.loadWorkerInfo(username).subscribe({
      next: worker => {
        this.worker = worker;
      },
      error: err => this.errorMessage = err
    });
  }

}
