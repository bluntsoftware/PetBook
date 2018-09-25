import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from "@angular/common/http";
import {IGlueClientModule, IGlueConfig} from "@bluntsoftware/iglue";
import {MomentModule} from "angular2-moment";
import {NewsfeedPageModule} from "../pages/newsfeed/newsfeed.module";

const url = 'https://petbook.bluntsoftware.com/PetBook';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IGlueClientModule,
    HttpClientModule,
    MomentModule,
    NewsfeedPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: IGlueConfig,  useValue:  IGlueClientModule.forRoot(url)}
  ]
})
export class AppModule {}
