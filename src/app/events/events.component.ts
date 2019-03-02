import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  folders = [{name: 'f1', updated: '12:30'}, {name: 'f2', updated: '12:30'}];
  notes = [{name: 'f1', updated: '12:30'}];

  constructor() { }

  ngOnInit() {
  }

}
