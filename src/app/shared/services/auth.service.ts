import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService) {}

  //#region Utilities
  private setUser(user:User) : void {
    const _user = JSON.stringify({
      id:user.id,
      name:user.name,
      email:user.email
    });//Password tutmayız gerçekçi olsun dedim :)
    localStorage.setItem('user', _user);
  }

  private getUser():any{
    return localStorage.getItem('user');
  }

  private removeUser() : void{
      localStorage.removeItem('user');
  }
  //#endregion

  async logIn(email:string, password:string) : Promise<boolean> {
    const result = await this.userService.getUserByEmailAndPassword(email,password).toPromise();
    if(result.length == 1){
      this.setUser(result[0]);
      return true;
    }
    return false;
  }

  logOut():void{
    this.removeUser();
  }

  isLoggedIn() : boolean{
    const user = this.getUser();
    if (user) {
      return true;
    }
    return false;
  }

}
