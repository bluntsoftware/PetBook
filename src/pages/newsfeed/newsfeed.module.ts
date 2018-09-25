import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsfeedPage } from './newsfeed';
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    NewsfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsfeedPage),
    MomentModule
  ],

})
export class NewsfeedPageModule {}
