import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationMatComponent } from './registration-mat/registration-mat.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { CriteriaComponent } from './criteria/criteria.component';

const routes: Routes = [
    { path: '', component: RegistrationMatComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'subscriber', component: SubscriberComponent },
    { path: 'criteria', component: CriteriaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
