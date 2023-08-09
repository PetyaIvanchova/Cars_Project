import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild ('form') form!: NgForm;

  user = {
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService,
     private router: Router){}

  register(): void{
    if(this.form.invalid){
      return;
    }
    
    this.userService.register(this.form.value);
    this.router.navigate(["/home"]);
  }

  passwordMismatch(){
    return this.user.confirmPassword !== this.user.password;
  }
  
}
