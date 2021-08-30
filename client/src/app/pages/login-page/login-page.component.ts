import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from 'src/app/services/storage.service';
import { LoginRequest } from 'src/app/shared/LoginResults';




@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPage implements OnInit {

  public creds: LoginRequest = {
    username: "",
    password:""
}
public errorMsg: string = "";


  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.errorMsg="";
    this.storage.login(this.creds).subscribe(()=>{
      this.router.navigate(["/home"]);
    },
    error => {
      console.log(error);
      this.errorMsg="Failed to log in";
    });
  }

}
