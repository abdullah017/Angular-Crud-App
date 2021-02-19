import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {
    id:0,
    email:'',
    password:'',
    name:''
  };
  constructor(
    private authService:AuthService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.authService.logOut();
  }

  onSubmit():void{
    if(this.user.email && this.user.password){
      this.authService.logIn(this.user.email, this.user.password)
      .then(response => {
        if(response) {
            this.router.navigate(['/home']);
            return;
        }     
        alert('Kullanıcı adı veya şifre yanlış!');  
      }, err=> console.log(err));
      
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

}
