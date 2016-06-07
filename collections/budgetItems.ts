import {Mongo} from 'meteor/mongo';

export let BudgetItems = new Mongo.Collection<BudgetItem>('budgetItems');
