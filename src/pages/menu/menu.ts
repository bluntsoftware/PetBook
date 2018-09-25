import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Auth} from "@bluntsoftware/iglue";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:Auth) {
    let that = this;
    this.auth.isAuthenticated().then(()=>{

    }).catch(()=>{
      that.navCtrl.setRoot(HomePage);
    });
  }
  open(pageName){
      this.root = pageName;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  logout(){
    this.auth.logout().then((msg)=>{
      this.navCtrl.setRoot(HomePage);
    }).catch((err)=>{

    });
  }
}