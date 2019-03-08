import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private eventService: EventService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.createEventForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            date: ['', Validators.required],
            target: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.createEventForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createEventForm.invalid) {
            return;
        }

        this.loading = true;
        this.eventService.createEvent(this.createEventForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Event Created.', true);
                    this.router.navigate(['/events']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
