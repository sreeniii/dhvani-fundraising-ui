import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'date', 'target', 'fundsRaised', 'status', 'actions'];
  dataSource: MatTableDataSource<Event>;
  isLoadingResults = true;

  constructor(private eventService: EventService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.loadAllEvents();
  }

  private loadAllEvents() {
    this.eventService.getAll().pipe(first()).subscribe(events => {
      this.dataSource = new MatTableDataSource(events);
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

  getEventDetail(row) {
    this.router.navigate(['/event-detail/', row.eventId]);
  }

}
