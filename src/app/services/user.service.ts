import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UpdateProfile } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.apiBaseUrl;

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + `/users`);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + `/users/${id}`);
    }

    register(user: User) {
        return this.http.post(this.apiUrl + `/users/register`, user);
    }

    update(id: string, user: UpdateProfile) {
        return this.http.put(this.apiUrl + `/users/${id}`, user);
    }

    delete(id: string) {
        return this.http.delete(this.apiUrl + `/users/${id}`);
    }

    toggleAdminRights(id: string, status: boolean) {
        return this.http.patch(this.apiUrl + `/users/${id}/admin/${status}`, null);
    }
}
