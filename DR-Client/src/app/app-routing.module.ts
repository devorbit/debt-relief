import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationMatComponent } from './registration-mat/registration-mat.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriberDetailsComponent } from './subscriber/subscriber-details.component';

const routes: Routes = [
    { path: '', component: RegistrationMatComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'subscriber-details', component: SubscriberDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }