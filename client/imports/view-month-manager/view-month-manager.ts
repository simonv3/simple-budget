import { Component, Input }       from '@angular/core';
import * as moment from 'moment';
import { ReactiveVar }     from 'meteor/reactive-var';

@Component({
  selector: 'view-month-manager',
  templateUrl: '/client/imports/view-month-manager/view-month-manager.html',
  directives: []
})
export class ViewMonthManager {

  constructor() {}

  @Input('filterInput') filterInput: ReactiveVar<Date>;

  stepBackward() {
    this.filterInput.set(moment(this.filterInput.get()).subtract(1, 'M').toDate())
  }

  stepForward() {
    this.filterInput.set(moment(this.filterInput.get()).add(1, 'M').toDate())
  }
}
