import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  
  registerUser(user:User):Observable<User> {
    
    const url = "http://localhost:8080/user/register";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //Authorization: 'my-auth-token'
      })
    };

    return this.http.post<User>(url,user,httpOptions);

  }
}
