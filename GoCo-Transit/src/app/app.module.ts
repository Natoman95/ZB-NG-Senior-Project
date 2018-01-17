import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RequestsPage } from './../pages/requests/requests';
import { HighlandPage } from './../pages/highland/highland';
import { OffersPage } from './../pages/offers/offers';
import { TabsPage } from './../pages/tabs/tabs';

import { FootNavComponent } from '../components/foot-nav/foot-nav';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequestsPage,
    OffersPage,
    HighlandPage,
    TabsPage,
    FootNavComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RequestsPage,
    OffersPage,
    HighlandPage,
    TabsPage,
    FootNavComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
