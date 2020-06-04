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

  submitCriteria(criteria: Criteria): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    });
    console.log(criteria);
    return this.http.post(`${environment.criteriaAPI.url}`, criteria, { headers });
  }

  checkCriteria(pin){
    return this.http.get(`${environment.checkCriteriaAPI.url}/${pin}`);
  }

  getTrade(pin) {
    return this.http.get(`${environment.getTradeAPI.url}/${pin}`);
  }

  getReliefValue(subscriberId, acctTypeCD, score) {
    return this.http.get(`${environment.getReliefValueAPI.url}/${subscriberId}/${acctTypeCD}/${score}`);
  }
}