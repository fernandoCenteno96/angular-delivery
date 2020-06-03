import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateEventsArray } from '@angular/fire/firestore/public_api';
import { UserModel } from '../../../models/users.model';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formRegister:FormGroup;
  User:UserModel;
  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private router:Router) { }

  ngOnInit(): void {

    this.formRegister=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      phone:['',Validators.required],
      password:['',Validators.required],
      check:['',Validators.required]
    });
  }
  Register(){
   this.User=this.formRegister.value;
   this.auth.newUser(this.User).subscribe(resp=>{
        this.router.navigateByUrl('/');
   },(err)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.error.error.message,
    });
   });
  }
}
