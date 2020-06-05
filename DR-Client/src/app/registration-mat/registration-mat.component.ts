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
    if (user_profile.pin && user_profile.pin.length > 0) { // User already logged in
      if (user_profile.email === 'admin@gmail.com') {
        this.router.navigateByUrl('/subscriber');
      } else {
        this.router.navigateByUrl('/profile');
      }
    }
  }

  loginOnSubmit() {
    this.spinner.show();
    const user = this.loginForm.value;
    console.log("Logging the user", user);
    this.userService.login(user).subscribe(
      userData => {
        // let userData = [[{ "_id": { "$oid": "5ed716ee8221ebeace230afd" }, "firstName": "test", "lastName": "y", "email": "ani@gmail.com", "password": "Test@12345", "DOB": "15-08-1989", "SSN": "123-23-3456" }]]
        const tempUserData = userData[0][0];
        console.log('User Data', tempUserData);
        user_profile.firstName = tempUserData.firstName;
        user_profile.lastName = tempUserData.lastName;
        user_profile.email = tempUserData.email;
        user_profile.DOB = tempUserData.DOB;
        user_profile.SSN = tempUserData.SSN;
        this.userService.pin(user_profile.SSN, user_profile.DOB).subscribe(
          pinData => {
            // let pinData = [[[["_id", { "$oid": "5ed72ec7e2ca713a0b1265f8" }], ["pin", { "$long": 1234 }], ["SSN", "123-23-3456"], ["DOB", "15-08-1989"]]]];
            pinData = pinData[0][0][1][1]['$long'];
            console.log('Pin Data', pinData);
            user_profile.pin = pinData.toString();
            this.userService.score(user_profile.pin).subscribe(
              scoreData => {
                // let scoreData = [[[["_id", { "$oid": "5ed76701e2ca713a0b1265fa" }], ["pin", { "$long": 1234 }], ["score", 800]]]];
                const tempScoreData = scoreData[0][0][2][1];
                console.log('Score Data', tempScoreData);
                user_profile.score = tempScoreData.toString();
                this.spinner.hide();
                if (user_profile.email === 'admin@gmail.com') {
                  this.router.navigateByUrl('/subscriber');
                } else {
                  this.router.navigateByUrl('/profile');
                }
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
