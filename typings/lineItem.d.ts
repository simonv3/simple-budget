interface LineItem {
  _id?: string;
  budgetCategory: BudgetItem;
  description?: string;
  amount: number;
  date: Date;
  itemType: string;
}
