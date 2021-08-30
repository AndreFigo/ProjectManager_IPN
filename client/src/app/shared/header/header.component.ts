import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  href : string = "";

  constructor(private router: Router, public storage : StorageService, private route: ActivatedRoute) {
    
  }
  
  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href);
  }

  isOnProfilePage(): boolean{
    return this.href === "/profile";
  }
  isOnWorkPage(): boolean{
    return this.href === "/work";
  }

}
