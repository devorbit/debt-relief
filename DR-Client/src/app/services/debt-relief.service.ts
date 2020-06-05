import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DebtRelief} from '../models/debt-relief';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DebtReliefService {

  constructor(private http: HttpClient) { }

  submitDebtRelief(debtRelief : DebtRelief){
    return this.http.post(`${environment.updateDebtReliefAPI.url}`, debtRelief).subscribe(
        success => {
          console.log("Debt Relief Options updated successfully");
          return "Your records have been successfully updated";
        },
        failure => {
          console.log(failure);
          return failure;
        }
    );
  }
}
