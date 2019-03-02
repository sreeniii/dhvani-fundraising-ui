import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatIconModule,
  MatListModule, MatGridListModule, MatCardModule,
  MatMenuModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatFormFieldModule, MatProgressSpinnerModule,
  MatInputModule, MatSnackBarModule, MatBadgeModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDeleteConfirmDialogComponent } from './users/user-delete-confirm-dialog/user-delete-confirm-dialog.component';

@NgModule({
  entryComponents: [
    UserDeleteConfirmDialogComponent
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    EventsComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    UsersComponent,
    AboutusComponent,
    ProfileComponent,
    UserDeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
