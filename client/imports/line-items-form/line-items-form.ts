import 'reflect-metadata';
import { Component } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { LineItems } from '../../../collections/lineItems.ts';
import { BudgetItems } from '../../../collections/budgetItems.ts';
import { Mongo } from 'meteor/mongo';
import * as moment from 'moment';

@Component({
  selector: 'line-items-form',
  templateUrl: '/client/imports/line-items-form/line-items-form.html'
})
export class LineItemsForm extends MeteorComponent {
  lineItemsForm: ControlGroup;
  budgetItems: Mongo.Cursor<BudgetItem>;
  defaultBudgetItem: BudgetItem;

  constructor() {
    super();

    this.budgetItems = BudgetItems.find();

    let fb = new FormBuilder();

    this.autorun(() => {
      this.defaultBudgetItem = this.budgetItems.fetch()[0];
      if (this.lineItemsForm) {
        (<Control>this.lineItemsForm.controls['budgetCategory']).updateValue(this.defaultBudgetItem._id);
      }
    });

    this.lineItemsForm = fb.group({
      budgetCategory: [ '', Validators.required],
      description: [''],
      amount: [0, Validators.required],
      date: [moment().format('YYYY-MM-DD'), Validators.required],
      itemType: ['expense', Validators.required]
    });
  }

  addLineItem(lineItem) {
    if (this.lineItemsForm.valid) {
      let budgetCategory = BudgetItems.findOne({_id: lineItem.budgetCategory});
      console.log(budgetCategory)
      LineItems.insert({
        budgetCategory: budgetCategory,
        description: lineItem.description,
        amount: lineItem.amount,
        date: lineItem.date,
        itemType: lineItem.itemType
      });

      (<Control>this.lineItemsForm.controls['description']).updateValue('');
      (<Control>this.lineItemsForm.controls['amount']).updateValue(0);
    }
  }
}
