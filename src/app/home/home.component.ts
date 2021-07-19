import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts$:Observable<any>=new Observable<any>();
  showLoader=true;

  constructor(private apiService: ApiService,private router: Router) {
    this.posts$=this.apiService.getuserData();
    this.posts$.subscribe((data) => 
     this.showLoader = false
   );
    //this.showLoader=false;
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

}
