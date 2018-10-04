import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Collection, IGlueConfig} from "@bluntsoftware/iglue";
import {HttpClient} from "@angular/common/http";
import {IonicPageList} from "../pagelist";

@IonicPage()
@Component({
  selector: 'page-roles',
  templateUrl: 'roles.html',
})
export class RolesPage extends IonicPageList<any> {

  constructor(public config:IGlueConfig,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public modalCtrl: ModalController,toastCtrl:ToastController) {
    super(alertCtrl, navCtrl, navParams, modalCtrl, toastCtrl);
    this.query();
  }

  getEditPage(): string {
    return "RoleFormPage";
  }

  getCreatePage(): string {
    return "RoleFormPage";
  }

  getCollection(): Collection<any> {
    let roles = new Collection(this.http);
    roles.setUrl( this.config.url + "/user_manager/applicationAuthority");
    return roles;
  }

  static sortByAuthority(a,b):number{
    if (a.authority < b.authority)
      return -1;
    if (a.authority > b.authority)
      return 1;
    return 0;
  }
  list(){
     return super.list(RolesPage.sortByAuthority);
  }

}
