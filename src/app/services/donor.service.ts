import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donor } from '../models/donor';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiBaseUrl;

  searchDonors(name: string): Observable<Donor[]> {
      return this.http.get<Donor[]>(this.apiUrl + `/donors/search/${name}`);
  }
}
