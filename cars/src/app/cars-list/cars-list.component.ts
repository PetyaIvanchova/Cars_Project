import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Car } from '../types/car';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit{
  carsList: Car[] = [];
  isLoading: boolean = true;
  constructor(private serviceApi: ApiService){}

  ngOnInit(): void {
    this.serviceApi.getCars().subscribe((cars) => {
    
      this.carsList = cars;
      this.isLoading = false;
    })
  }

}
