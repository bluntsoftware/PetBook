import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from "@angular/common/http";
import {Auth, IGlueClientModule, IGlueConfig} from "@bluntsoftware/iglue";
import {MomentModule} from "angular2-moment";
import {NewsfeedPageModule} from "../pages/newsfeed/newsfeed.module";
import {
  AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider,
  LinkedInLoginProvider
} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);
export function provideConfig() {
  return config;
}
const url:string = "https://petbook.bluntsoftware.com/PetBook";//http://localhost/glue
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
    {provide: IGlueConfig,  useValue:  IGlueClientModule.forRoot(url)},
    {provide: AuthServiceConfig, useFactory: provideConfig},
    Auth
  ]
})
export class AppModule {}
