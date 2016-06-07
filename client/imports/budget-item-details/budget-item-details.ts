import 'reflect-metadata';
import { Component, Input } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { BudgetItems } from '../../../collections/budgetItems.ts';

@Component({
  selector: 'budget-item-details',
  templateUrl: '/client/imports/budget-item-details/budget-item-details.html'
})
export class BudgetItemDetails {
  budgetItemsForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.budgetItemsForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      amount: [0, Validators.required]
    });
  }

  @Input('item') budgetItem: BudgetItem;

  saveBudgetItem(item) {
    if (this.budgetItemsForm.valid) {
      console.log(item._id);
      BudgetItems.update(item._id, {
        $set: {
          name: item.name,
          description: item.description,
          amount: item.amount
        }
      });
    }
  }

  removeBudgetItem(item) {
    BudgetItems.remove(item._id);
  }
}
