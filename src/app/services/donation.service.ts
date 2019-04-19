import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddDonation } from '../models/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiBaseUrl;

  addDonation(donation: AddDonation) {
      return this.http.post(this.apiUrl + `/donations`, donation);
  }
}
