import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GoCoTransit } from './app.component';
import { HomeComponent } from '../pages/home/home.component';

@NgModule({
  declarations: [
    GoCoTransit,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(GoCoTransit)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GoCoTransit,
    HomeComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
