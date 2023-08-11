import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { appUrl } from 'src/environments/environment.development';
import { Car } from './types/car';
import { decode } from 'jsonwebtoken';
import { User } from './types/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<Car[]>(`${appUrl}/cars/catalog`)
  }

  async postUser(data: User){
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    const decodedToken = this.decodeToken(user.data.token);
    data._id = decodedToken._id;
    return this.http.post<User>(`${appUrl}/auth/users/edit`, data).subscribe((res)=>{
    })
  }

  editCar(id: string, data: string){
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.data.token
      })
    };

    return this.http.put<Car>(`${appUrl}/cars/${id}/edit`, data, httpOptions)
  }

  getUser(){
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    const decodedToken = this.decodeToken(user.data.token);

    return this.http.get<User>(`${appUrl}/auth/users/${decodedToken._id}`)
  }

  deleteCar(id: string) {
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.data.token
      })
    };
    return this.http.delete<Car>(`${appUrl}/cars/${id}/delete`, httpOptions);
  }

  getCarDetails(id: string) {
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.data.token
      })
    };
    return this.http.get<Car>(`${appUrl}/cars/${id}/details`, httpOptions)
  }

  addCar(data: Car) {
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    const decodedToken = this.decodeToken(user.data.token);
    data.owner = decodedToken._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.data.token
      })
    };
    return this.http.post<Car>(`${appUrl}/cars/create`, data, httpOptions)
  }

  decodeToken(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getTokenData() {
    const user: any = JSON.parse(localStorage.getItem('[user]') || '');
    return this.decodeToken(user.data.token);
  }
}
