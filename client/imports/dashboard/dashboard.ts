import { Component }   from '@angular/core';
import { RouterLink }  from '@angular/router-deprecated';
import { LineItemsForm } from '../line-items-form/line-items-form';
import { LineItemsList } from '../line-items-list/line-items-list';
import { ViewMonthManager } from '../view-month-manager/view-month-manager';
import { ReactiveVar }     from 'meteor/reactive-var';

@Component({
  selector: 'dashboard',
  templateUrl: '/client/imports/dashboard/dashboard.html',
  directives: [RouterLink, LineItemsForm, LineItemsList, ViewMonthManager]
})

export class Dashboard {
  filterType: string;
  filterInput: ReactiveVar<Date>;

  constructor() {
    this.filterType = 'month';
    this.filterInput = new ReactiveVar<Date>(new Date());
  }
}
