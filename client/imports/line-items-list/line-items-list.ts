import { Component, Input }       from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar }     from 'meteor/reactive-var';
import { Mongo }           from 'meteor/mongo';
import { LineItems }       from '../../../collections/lineItems';
import * as moment from 'moment';

@Component({
  selector: 'line-items-list',
  templateUrl: '/client/imports/line-items-list/line-items-list.html',
  directives: []
})
export class LineItemsList extends MeteorComponent {
  lineItems: Mongo.Cursor<LineItem>;
  totalLineItems: number;

  @Input('filterType') filterType;
  @Input('filterInput') filterInput: ReactiveVar<Date>;

  constructor() {
    super();

    this.autorun(() => {
      var filter = this.buildFilter(this.filterType, this.filterInput);

      this.lineItems = LineItems.find(filter);

      this.totalLineItems = this.lineItems.fetch().reduce(function (prev, item) {
        if (item.itemType === 'expense')
          return prev -= item.amount;
        if (item.itemType === 'income')
          return prev += item.amount;
      }, 0)
    }, true)
  }

  removeLineItem (item) {
    LineItems.remove(item._id);
  }

  buildFilter (filterType, input) : Object {
    if (filterType === 'month' && input) {
      let startDate = moment(input.get()).startOf('month').format();
      let endDate = moment(input.get()).endOf('month').format();

      return {
          'date': { '$gte': startDate,
                    '$lt': endDate },
      }
    }
    return {};
  }
}
