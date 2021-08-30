import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { RegisterResults } from 'src/app/shared/RegisterResults';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class Register implements OnInit {


  public regInfo : RegisterResults= new RegisterResults();

  public errorMsg: string ="";

  public roles : string[]=["Manager", "Programmer"]

  constructor(public storage: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister():void {
    this.storage.register(this.regInfo).subscribe(()=>{
      this.router.navigate(["home"]);
    },
    error => {
      console.log(error);
      this.errorMsg="Failed to register in";
    });
  }

}
