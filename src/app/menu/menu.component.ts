import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CurrentUser } from '../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  userInfo: CurrentUser;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.userInfo = x);
  }
}
