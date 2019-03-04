import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CurrentUser } from '../models/user';
import { faSignInAlt, faInfo, faUsers, faCalendarAlt, faColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  userInfo: CurrentUser;
  faSignInAlt = faSignInAlt;
  faInfo = faInfo;
  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt;
  faColumns = faColumns;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.userInfo = x);
  }
}
