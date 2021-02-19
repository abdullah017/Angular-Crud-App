import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl =  `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  getUserByEmailAndPassword(email:string,password:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }

  registerUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}`,user);
  }



  
}
