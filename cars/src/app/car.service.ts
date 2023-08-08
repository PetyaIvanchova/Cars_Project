import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClientModule) { }

  addCar(data){
    return this.http.post()
  }
}
