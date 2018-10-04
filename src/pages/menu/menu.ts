import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Auth, IGlueConfig} from "@bluntsoftware/iglue";
import {NewsfeedPage} from "../newsfeed/newsfeed";
import {HomePage} from "../home/home";


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  root: any = NewsfeedPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:Auth,public config:IGlueConfig) {
    let that = this;
    if(!auth.authenticated){
      that.navCtrl.setRoot(HomePage);
    }
  }
  goToConduit(){
    window.open(this.config.url + '/#/admin/conduitviewer');
  }
  open(pageName){
      this.root = pageName;
  }
  logout(){
    this.auth.logout().then((msg)=>{
      this.navCtrl.setRoot(HomePage);
    }).catch((err)=>{

    });
  }
}
