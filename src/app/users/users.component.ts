import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserDeleteConfirmDialogComponent } from './user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'firstName', 'lastName', 'isAdmin', 'actions'];
  dataSource: MatTableDataSource<User>;
  isLoadingResults = true;

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(user.userId).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
      }
    });
  }

  editUser(user: User) {
    this.router.navigate(['/profile'], { queryParams: { id: user.userId, editMode: true } });
  }

  toggleAdminRights(id: string, status: boolean) {
    this.userService.toggleAdminRights(id, status).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
