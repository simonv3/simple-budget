import {Mongo} from 'meteor/mongo';

export let LineItems = new Mongo.Collection<LineItem>('lineItems');
