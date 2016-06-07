import { Component }       from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { Mongo }           from 'meteor/mongo';
import { ReactiveVar }     from 'meteor/reactive-var';
import { RouterLink }      from '@angular/router-deprecated';
import { BudgetItems }     from '../../../collections/budgetItems';
import { BudgetItemsForm } from '../budget-items-form/budget-items-form';
import { BudgetItemDetails } from '../budget-item-details/budget-item-details';

@Component({
  selector: 'budget-items-list',
  templateUrl: '/client/imports/budget-items-list/budget-items-list.html',
  directives: [BudgetItemsForm, BudgetItemDetails, RouterLink]
})
export class BudgetItemsList extends MeteorComponent {
  budgetItems: Mongo.Cursor<BudgetItem>;
  totalBudget: number;

  constructor() {
    super();

    this.budgetItems = BudgetItems.find();

    this.autorun(() => {
      this.totalBudget = this.budgetItems.fetch().reduce(function (prev, item) {
        return prev += item.amount;
      }, 0)
    }, true)
  }

  removeBudgetItem(item) {
    BudgetItems.remove(item._id);
  }
}
