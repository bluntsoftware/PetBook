import { Component } from '@angular/core';
import {
  AlertController, IonicPage, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {Collection, IGlue, IGlueConfig} from "@bluntsoftware/iglue";
import {HttpClient} from "@angular/common/http";
import {IonicPageList} from "../pagelist";


/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage extends IonicPageList<any> {

  constructor(public iglue:IGlue,public config:IGlueConfig,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public modalCtrl: ModalController,toastCtrl:ToastController) {
    super(alertCtrl,navCtrl, navParams, modalCtrl,toastCtrl);
    this.query();
  }
  public updateUrl(event){
    event.target.attributes.src.value ="assets/imgs/no_pic.jpg"
  }
  getEditPage(): string {
    return "UserFormPage";
  }

  getCreatePage(): string {
    return "UserFormPage";
  }

  getCollection(): Collection<any> {
    return this.iglue.user();
  }

  static sortByLogin(a, b){
    if (a.login < b.login)
      return -1;
    if (a.login > b.login)
      return 1;
    return 0;
  }

  list(){
    return super.list(UsersPage.sortByLogin);
  }

  getRoles(user){
    return user.roles.map( (role)=>{return role.authority;}).join(", ");
  }

}
