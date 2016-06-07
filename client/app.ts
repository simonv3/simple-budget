import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { ROUTER_PROVIDERS,
         ROUTER_DIRECTIVES,
         RouteConfig } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';
import { Dashboard } from './imports/dashboard/dashboard.ts';
import { BudgetItemsList } from './imports/budget-items-list/budget-items-list.ts';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', as: 'Dashboard', component: Dashboard },
  { path: '/budget-items/', as: 'BudgetItemsList', component: BudgetItemsList },
])

class Budget { }

bootstrap(Budget,
          [ROUTER_PROVIDERS,
           provide(APP_BASE_HREF, { useValue: '/' })]);
