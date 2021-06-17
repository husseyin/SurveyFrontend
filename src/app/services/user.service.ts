import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl + '/users';

  constructor(private httpClient: HttpClient) {}

  validUser(username: string, password: string): Observable<any> {
    let newPath =
      this.url + '/validuser?username=' + username + '&password=' + password;
    return this.httpClient.get<any>(newPath);
  }

  isLogin(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
