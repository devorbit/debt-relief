import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-mat',
  templateUrl: './registration-mat.component.html',
  styleUrls: ['./registration-mat.component.css']
})
export class RegistrationMatComponent {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  regForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    dob: [null, Validators.required],
    ssn: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) { 
  }

  loginOnSubmit() {
    alert('Thanks!');
  }

  regOnSubmit() {
    alert('Thanks!');
  }
}
