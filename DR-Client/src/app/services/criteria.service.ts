import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscriber} from '../models/subscriber';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Criteria} from "../models/criteria";

@Injectable({
  providedIn: 'root'
})

export class CriteriaService {
  // userAPI = environment.userAPI;
  constructor(private http: HttpClient) {
  }

  submitCriteria(criteria: Criteria){
    return this.http.post(`${environment.criteriaAPI.url}`, criteria).subscribe(
        success => {
          console.log("Criteria added successfully");
          return "Your records have been successfully updated";
        },
        failure => {
          console.log(failure);
          return failure;
        }
    );
  }

  checkCriteria(pin){
    return this.http.get(`${environment.checkCriteriaAPI.url}/${pin}`);
  }
}