import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Car } from './types/car';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCars(){
    const {appUrl} = environment;
    return this.http.get<Car[]>(`${appUrl}/cars/catalog`)
  }
}
