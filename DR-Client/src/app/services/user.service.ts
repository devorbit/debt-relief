import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userAPI = environment.userAPI;
  config = {
    apiUrl : ''
  };
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.config.apiUrl}/users`);
  }

  register(user: User): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'});
    console.log(user);
    return this.http.post(`${environment.regAPI.url}`, user, {headers});
  }

  login(user: User): Observable<any> {
    console.log(user);
    return this.http.get(`${environment.loginAPI.url}/${user.email}/${user.password}`)
  }

  pin(ssn, dob): Observable<any> {
    return this.http.get(`${environment.pinAPI.url}/${ssn}/${dob}`);
  }

  score(pin): Observable<any> {
    return this.http.get(`${environment.scoreAPI.url}/${pin}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.config.apiUrl}/users/${id}`);
  }
}
