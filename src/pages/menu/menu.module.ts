import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import {NewsfeedPage} from "../newsfeed/newsfeed";
import {MomentModule} from "angular2-moment";


@NgModule({
  declarations: [
    MenuPage
  ],
  imports: [
    IonicPageModule.forChild(MenuPage)
  ],

})
export class MenuPageModule {}
