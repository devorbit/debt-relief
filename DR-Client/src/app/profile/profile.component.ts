import { Component, OnInit, AfterViewInit } from '@angular/core';
import { user_profile } from '../user.profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  userProfile = user_profile;

  constructor() { }

  ngOnInit(): void {
    this.userProfile = user_profile;
  }

  ngAfterViewInit() {
    this.userProfile = user_profile;
  }

}
