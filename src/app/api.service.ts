import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isAuthenticated() {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token!==undefined && token;
  }

  apiBaseUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getuserData(){
    return this.http.get('https://my-json-server.typicode.com/typicode/demo/posts')
  }

  doLogin(data:any):Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`,data);
  }
}
