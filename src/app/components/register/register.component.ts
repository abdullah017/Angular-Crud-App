import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: any;
 
  constructor(
    private userService:UserService,
    private router:Router,
    private formBuilder: FormBuilder,
  ) { }


 
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:['', [Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]],
    });
  }


  saveUser(){
    this.userService.registerUser(this.registerForm.value)
        .subscribe((res)=>{
          if (res.id > 0) {
            alert("Kayıt başarılı giriş sayfasına yönlendiriliyorsunuz")
            this.router.navigate(['/login']);
          }
        });
        console.log(this.registerForm);
  }
}