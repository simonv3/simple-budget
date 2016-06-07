import 'reflect-metadata';
import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { BudgetItems } from '../../../collections/budgetItems.ts';

@Component({
  selector: 'budget-items-form',
  templateUrl: '/client/imports/budget-items-form/budget-items-form.html'
})
export class BudgetItemsForm {
  budgetItemsForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.budgetItemsForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      amount: [0, Validators.required]
    });
  }

  addBudgetItem(budgetItem) {
    if (this.budgetItemsForm.valid) {
      BudgetItems.insert({
        name: budgetItem.name,
        description: budgetItem.description,
        amount: budgetItem.amount
      });

      (<Control>this.budgetItemsForm.controls['name']).updateValue('');
      (<Control>this.budgetItemsForm.controls['description']).updateValue('');
      (<Control>this.budgetItemsForm.controls['amount']).updateValue(0);
    }
  }
}
