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
  errorMessage: string = '';
  user = {
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService,
     private router: Router){}

  async register(): Promise<void>{
    if(this.form.invalid){
      return;
    }
    
    this.userService.register(this.form.value).subscribe((res: any)=>{
    
      if (res.data.success) {
        this.router.navigate(["/home"]);
        localStorage.setItem('[user]', JSON.stringify(res));
      }
      else {
        this.errorMessage = res.data.message;
      }
      return res;
    });
    
  }

  passwordMismatch(){
    return this.user.confirmPassword !== this.user.password;
  }
  
}
