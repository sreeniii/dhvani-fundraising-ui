import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { first, debounceTime, switchMap, filter } from 'rxjs/operators';
import { DonationService } from 'src/app/services/donation.service';
import { Observable } from 'rxjs';
import { Donor } from 'src/app/models/donor';
import { DonorService } from 'src/app/services/donor.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { LookupService } from 'src/app/services/lookup.service';
import { Lookup } from 'src/app/models/lookup';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

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
  donationTypes: Lookup[];

  eventId: string;
  event: Event;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private donationService: DonationService,
      private donorService: DonorService,
      private lookupService: LookupService,
      private alertService: AlertService,
      private eventService: EventService,
      private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.newDonationForm = this.formBuilder.group({
        eventId: ['', Validators.required],
        donorId: [''],
        donorName: ['', Validators.required],
        donorEmail: ['', Validators.required],
        donorPhone: [''],
        amount: ['', Validators.required],
        comments: [''],
        paymentCompleted: [''],
        donationTypeCode: ['', Validators.required]
    });

    this.filteredDonors = this.newDonationForm.get('donorName').valueChanges
      .pipe(
        filter(value => value.length > 2),
        debounceTime(300),
        switchMap(value => this.donorService.searchDonors(value))
      );

    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.newDonationForm.controls['eventId'].setValue(this.eventId);
    this.getEventById(this.eventId);
    this.getDonationTypes();
  }

  // convenience getter for easy access to form fields
  get f() { return this.newDonationForm.controls; }

  clearDonorDetails() {
    this.newDonationForm.controls['donorEmail'].setValue('');
    this.newDonationForm.controls['donorId'].setValue('');
  }

  // searchDonors() {
  //   const donorName = this.newDonationForm.value.donorName;
  //   this.clearDonorDetails();

  //   this.filteredDonors = of(donorName).pipe(
  //       filter(value => value.length > 2),
  //       debounceTime(3000),
  //       switchMap(value => this.donorService.searchDonors(value))
  //     );
  // }

  selectDonor(event: MatAutocompleteSelectedEvent, donor: Donor) {
      this.newDonationForm.controls['donorEmail'].setValue(donor.email);
      this.newDonationForm.controls['donorId'].setValue(donor.donorId);
  }

  getDonationTypes() {
    this.lookupService.getDonationTypes().pipe(first()).subscribe(donationTypes => {
      this.donationTypes = donationTypes;
    });
  }

  getEventById(eventId) {
    this.eventService.getById(eventId).subscribe(event => {
      this.event = event;
    });
  }

  onSubmit() {
      this.submitted = true;
      console.log(this.newDonationForm.value);

      // stop here if form is invalid
      if (this.newDonationForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.newDonationForm.value);
      this.donationService.addDonation(this.newDonationForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Donation saved successfully.', true);
                  this.router.navigate(['/donations']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
