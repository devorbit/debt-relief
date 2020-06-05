import { Component, OnInit, AfterViewInit } from '@angular/core';
import { user_profile } from '../user.profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  userProfile = user_profile;

    gaugeType = 'arch';
    gaugeValue = this.userProfile.score;
    gaugeLabel = 'Credit Score';

    thresholdConfig = {
        700: {color: 'green'},
        400: {color: 'orange'},
        0: {color: 'red'}
    };

  constructor() { }

  ngOnInit(): void {
    this.userProfile = user_profile;
  }

  ngAfterViewInit() {
    this.userProfile = user_profile;
  }

}
