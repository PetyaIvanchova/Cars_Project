import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Car } from '../types/car';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  car !: Car;
  public id!: string | null;

  isEditMode: boolean = false;

  @ViewChild('form') form!: NgForm;

  onEditMode() {
    this.isEditMode = true;
  }

  constructor(private apiSrvice: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.apiSrvice.getCarDetails(this.id).subscribe((data: any) => {
        this.car = data.data.car;
        this.isEditMode = true;
      })
    }
  }

  editCar(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    if (this.id) {
      this.apiSrvice.editCar(this.id, this.form.value).subscribe((data) => {
        
      });
    }

  }

  save(form: NgForm) {
    if (this.isEditMode) {
      this.editCar(this.form);
      this.router.navigate(['/catalog', this.id]);
    }
    else {
      this.addCar(form);
      this.router.navigate(['/catalog']);
    }
  }

  addCar(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.apiSrvice.addCar(this.form.value).subscribe((data) => {
     
      this.form.reset();
    });
  }
}
