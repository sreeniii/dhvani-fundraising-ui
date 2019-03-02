import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
//   message: any;

  constructor(private alertService: AlertService, public snackBar: MatSnackBar) { }

  ngOnInit() {
      this.subscription = this.alertService.getMessage().subscribe(message => {
        if (message != null) {
            this.snackBar.open(message.text, message.type, {
                duration: 5000,
            });
        }
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
