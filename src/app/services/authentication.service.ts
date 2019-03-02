import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from './auth.constants';
import { environment } from 'src/environments/environment';
import { User, CurrentUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('current_user')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  apiUrl: string = environment.apiBaseUrl;

  public get currentUserValue(): CurrentUser {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));
      return this.http.post<any>(this.apiUrl + `/oauth/token`, body, { headers: headers })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user[TOKEN_NAME]) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('current_user', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('current_user');
      this.currentUserSubject.next(null);
  }
}
