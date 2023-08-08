import { Component, OnInit } from '@angular/core';
import { Car } from '../types/car';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  car!: Car;
  public id!: string | null;
  isCarOwner = false;

  constructor(private serviceApi: ApiService,
    private route: ActivatedRoute,
    private nav: Router) {
  }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.serviceApi.getCarDetails(this.id).subscribe((data: any) => {
        this.car = data.data.car;
        const tokenData = this.serviceApi.getTokenData();
        this.isCarOwner = tokenData._id === this.car.owner._id;
      })
    }
  }

  deleteBtn() :void{

    if(this.id){
      this.serviceApi.deleteCar(this.id).subscribe(data => {
        console.log(data);
        this.nav.navigate(["/catalog"]);
      });
      }
    
  }

 
}
