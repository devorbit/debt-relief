import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userAPI = environment.userAPI;
  config = {
    apiUrl : ''
  };
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.config.apiUrl}/users`);
  }

  register(user: User) {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'});
    console.log(user);
    return this.http.post(`${this.userAPI.url}`, user, {headers}).subscribe();
  }

  delete(id: number) {
    return this.http.delete(`${this.config.apiUrl}/users/${id}`);
  }
}
