import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  href : string = "";

  constructor(private router: Router) {
    
  }
  
  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href);
  }

  isOnHomePage(): boolean{
    return this.href === "/home";
  }
  isOnWorkPage(): boolean{
    return this.href === "/work";
  }

}
