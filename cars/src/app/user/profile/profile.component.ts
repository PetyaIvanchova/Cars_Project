import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  isEditMode = false;
  user!: User;

  @ViewChild ('form') form !: NgForm;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.apiService.getUser().subscribe((data: any)=>{
     
        this.user = data.data;
       
      })
      
  }

  openEditMode() {
    this.isEditMode = true;
  }

  save(form: NgForm){
    if(form.invalid){
      return;
    }

    this.apiService.postUser(this.form.value)
    
    this.isEditMode = false;
  }
}
