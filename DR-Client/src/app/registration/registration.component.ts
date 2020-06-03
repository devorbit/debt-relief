import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  userForm: any;
  loading: any;
  submitted = false;

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      ssn: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.user = this.userForm.value;
    console.log("Submitting the user");
    this.userService.register(this.user);
  }

}
