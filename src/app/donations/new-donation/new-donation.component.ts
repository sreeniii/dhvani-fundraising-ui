import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { first, debounceTime, switchMap } from 'rxjs/operators';
import { DonationService } from 'src/app/services/donation.service';
import { Observable } from 'rxjs';
import { Donor } from 'src/app/models/donor';
import { DonorService } from 'src/app/services/donor.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.component.html',
  styleUrls: ['./new-donation.component.css']
})
export class NewDonationComponent implements OnInit {

  newDonationForm: FormGroup;
  loading = false;
  submitted = false;
  filteredDonors: Observable<Donor[]>;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private donationService: DonationService,
      private donorService: DonorService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() {
      this.newDonationForm = this.formBuilder.group({
          eventId: ['', Validators.required],
          donorId: [''],
          donorName: ['', Validators.required],
          donorEmail: ['', Validators.required],
          donorPhone: ['', Validators.required],
          amount: ['', Validators.required],
          comments: [''],
          paymentCompleted: [''],
          donationTypeCode: ['', Validators.required]
      });

      this.filteredDonors = this.newDonationForm.get('donorName').valueChanges
        .pipe(
          debounceTime(300),
          switchMap(value => this.donorService.searchDonors(value))
        );
  }

  // convenience getter for easy access to form fields
  get f() { return this.newDonationForm.controls; }

  selectDonor(event: MatAutocompleteSelectedEvent, donor: Donor) {
      console.log(donor);
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.newDonationForm.invalid) {
          return;
      }

      this.loading = true;
      // this.donationService.addDonation(this.newDonationForm.value)
      //     .pipe(first())
      //     .subscribe(
      //         data => {
      //             this.alertService.success('Donation saved successfully.', true);
      //             this.router.navigate(['/donations']);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  }

}
