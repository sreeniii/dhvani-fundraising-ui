import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, CurrentUser } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  private subscription: Subscription;
  userId: string;
  editMode: boolean;
  user: User;
  loading = false;
  submitted = false;
  currentUser: CurrentUser;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        phoneNumber: ['']
    });

    this.subscription = this.route.queryParams.subscribe(params => {
      this.editMode = params['editMode'] || false;
      this.userId = params['id'] || this.currentUser.userId;
      this.userService.getById(this.userId).subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(this.user);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.update(this.userId, this.profileForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Profile Updated successfully.', true);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

  cancelUpdate() {
    this.profileForm.patchValue(this.user);
  }

}
