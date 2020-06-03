import { Component } from '@angular/core';
import { user_profile } from './user.profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DR-Client';
  user_profile = user_profile;

  constructor(private router: Router) {
  }

  logout() {
    user_profile.score = '';
    this.router.navigateByUrl('/');
  }
}
