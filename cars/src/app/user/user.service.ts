import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { appUrl } from 'src/environments/environment.development';
import { Token } from '../types/token';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : User | undefined
  USER_KEY = '[user]';

  get isLoggedIn(): boolean{
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  constructor(private http: HttpClient,
    private router: Router) {
    try{
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  login(data: User) :void{
    this.http.post<Token>(`${appUrl}/auth/login`, data).subscribe((res)=>{
      console.log(res);
      localStorage.setItem(this.USER_KEY, JSON.stringify(res));
    })
   
  }

  logout() :void{
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(["/home"]);
  }

  register(data: User){
    this.http.post<Token>(`${appUrl}/auth/register`, data).subscribe((res)=>{
      console.log(res);
      localStorage.setItem(this.USER_KEY, JSON.stringify(res.token));
    })
  }
}
