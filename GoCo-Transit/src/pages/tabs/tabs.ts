import { Component } from '@angular/core';

import { RequestsPage } from '../requests/requests';
import { HighlandPage } from './../highland/highland';
import { OffersPage } from './../offers/offers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  requests = RequestsPage;
  offers = OffersPage;
  highland = HighlandPage;

  constructor() {

  }
}