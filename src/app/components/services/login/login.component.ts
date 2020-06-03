import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../models/users.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup;
  User:UserModel=new UserModel();
  remember=false;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.User.email=localStorage.getItem('email');
      this.remember=true;
    }
    this.formLogin=this.fb.group({
      email:['',Validators.compose([Validators.email,Validators.required])],
      password:['',Validators.required],
      
    })
  }
  login(){
    this.User=this.formLogin.value;
    this.auth.login(this.User).subscribe(resp=>{

      if(this.remember){
        localStorage.setItem('email',this.User.email);
      }
      this.router.navigateByUrl('/');
    },(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'correo electronico Ó contraseña inconrecta!',
      });
    });
  }
}
