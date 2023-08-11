import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild ('form') form !: NgForm;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router){}

  login(form: NgForm) : void{
    if(form.invalid){
      return;
    }

    this.userService.login(this.form.value).subscribe((res: any)=>{

      if(res.data.success){
        this.router.navigate(["/home"]);
        localStorage.setItem("[user]", JSON.stringify(res));
      } else {
        this.errorMessage = res.data.message;
      }
      return res;
    });
  }
}
