import { Component } from '@angular/core';

import { RequestsPage } from '../requests/requests';
import { OffersPage } from './../offers/offers';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  requests = RequestsPage;
  offers = OffersPage;
  settings = SettingsPage

  constructor() {

  }
}