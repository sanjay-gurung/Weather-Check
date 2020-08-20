import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  spinner: Observable<boolean>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.spinner = this.store.pipe(select(state => state.spinner.isOn));
  }

  }
}
