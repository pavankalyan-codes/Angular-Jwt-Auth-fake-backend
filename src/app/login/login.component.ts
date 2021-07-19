import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError=false;
  constructor(private apiService: ApiService,private router:Router) { 
    
    if(this.apiService.isAuthenticated()){
      this.router.navigate(['home'])
    }
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

  onSubmit() {
    console.log(this.loginForm.value);
    if(this.loginForm.valid) {
      this.apiService.doLogin(this.loginForm.value).subscribe((data)=>{
        console.log(data);
        localStorage.setItem("token",data.token);
        this.router.navigate(["home"]);

      },(err)=>{this.loginError=true});
    }
  }
  ngOnInit(): void {

  }

}
