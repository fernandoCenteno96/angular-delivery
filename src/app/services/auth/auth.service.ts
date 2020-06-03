import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/users.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey='AIzaSyD6x3C4RT2CH_u8JxZPQsYW8ZfMMS4M-AI';
  userToken:string;
  //crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http:HttpClient) { 
    this.readToken();
  }

  logout(){
      localStorage.removeItem('token');
  }
  login(user:UserModel){
    const authData={
      ...user,
      returnSecureToken:true
    }
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp=>{
         this.saveToken(resp['idToken']);
         return resp;
      })
    );
  }
  newUser(user:UserModel){

    const authData={
      ...user,
      returnSecureToken:true
    }
    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp=>{
         this.saveToken(resp['idToken']);
         return resp;
      })
    );

  }
  private saveToken(idToken:string){

    this.userToken=idToken;
    localStorage.setItem('token',idToken);
  }

  readToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }

    return this.userToken;
  }
  loginStatus():boolean{
    return this.userToken.length>2;
  }
}
