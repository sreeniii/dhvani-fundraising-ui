import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateEvent, Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiBaseUrl;

  getAll(): Observable<Event[]> {
      return this.http.get<Event[]>(this.apiUrl + `/events`);
  }

  getById(id: string): Observable<Event> {
      return this.http.get<Event>(this.apiUrl + `/events/${id}`);
  }

  createEvent(event: CreateEvent) {
      return this.http.post(this.apiUrl + `/events`, event);
  }
}
