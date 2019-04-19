import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiBaseUrl;

  getEventStatuses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `/lookup/eventstatuses`);
  }

  getDonationTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `/lookup/donationtypes`);
  }

}
