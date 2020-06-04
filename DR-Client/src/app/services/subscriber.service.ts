import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscriber} from '../models/subscriber';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubscriberService {
    // userAPI = environment.userAPI;
    constructor(private http: HttpClient) { }


    submitSubscriber(subscriber: Subscriber){
        return this.http.post(`${environment.subscriberAPI.url}`, subscriber).subscribe(
            success => {
                console.log("Subscriber added successfully");
                return "Your records have been successfully updated";
            },
            failure => {
                console.log(failure);
                return failure;
            }
        );
    }

    checkSubscriber(subscriberId, loanType, scoreFrom,scoreTo, debtRelief){
        return this.http.get(`${environment.checkSubscriberAPI.url}/${subscriberId}/${loanType}/${scoreFrom}/${scoreTo}/${debtRelief}`);
    }
}