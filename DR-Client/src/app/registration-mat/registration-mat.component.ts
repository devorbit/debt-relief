import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { user_profile } from '../user.profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
declare var $: any;
@Component({
  selector: 'app-registration-mat',
  templateUrl: './registration-mat.component.html',
  styleUrls: ['./registration-mat.component.css']
})
export class RegistrationMatComponent {
  loginForm = this.loginFB.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(10)]],
  });

  regForm = this.regFB.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(10)]],
    DOB: [null, [Validators.required]],
    SSN: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
  });

  constructor(private regFB: FormBuilder, private loginFB: FormBuilder, private userService: UserService, private spinner: NgxSpinnerService, private router: Router) {
  }

  loginOnSubmit() {
    this.spinner.show();
    const user = this.loginForm.value;
    console.log("Logging the user", user);
    this.userService.login(user).subscribe(
      succesData => {
        console.log('User Data', succesData);
        user_profile.firstName = succesData.firstName;
        user_profile.lastName = succesData.lastName;
        user_profile.email = succesData.email;
        user_profile.DOB = succesData.DOB;
        user_profile.SSN = succesData.SSN;
        this.userService.pin(user_profile.SSN, user_profile.DOB).subscribe(
          succesData => {
            succesData = succesData[0][0][1][1].$long;
            console.log('Pin Data', succesData);
            user_profile.pin = succesData;
            this.userService.score(user_profile.pin).subscribe(
              succesData => {
                succesData = succesData[0][0][2][1];
                console.log('Score Data', succesData);
                user_profile.score = succesData;
                this.spinner.hide();
                this.router.navigateByUrl('/criteria');
              },
              err => {
                console.error(err);
                this.spinner.hide();
              }
            );
          },
          err => {
            console.error(err);
            this.spinner.hide();
          }
        );
      },
      err => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  regOnSubmit() {
    this.spinner.show();
    const user = this.regForm.value;
    console.log(this.regForm);
    console.log("Registering the user", user);
    this.userService.register(user).subscribe(
      succesData => {
        console.log('Success Data', succesData);
        this.spinner.hide();
        alert('Registration Successful, Please Login to continue');
      },
      err => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  tabChanged(event: MatTabChangeEvent) {
    console.log('Tab changed');
    this.loginForm.reset();
    this.regForm.reset();
  }
}
