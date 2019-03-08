import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventId: string;
  event: Event;
  subscription: Subscription;

  single: any[];
  view: any[] = [500, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = false;
  showYAxisLabel = false;

  colorScheme = {
    domain: ['#2ddeb6', '#ff8400', '#AAAAAA']
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.getEventById(this.eventId);
  }

  private getEventById(eventId) {
    this.subscription = this.eventService.getById(eventId).subscribe(event => {
        this.event = event;
        this.single = [
          {
            'name': 'Target',
            'value': this.event.target
          },
          {
            'name': 'Funds Raised',
            'value': this.event.fundsRaised
          }
        ];
      });
  }

}
