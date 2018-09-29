import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Auth, IGlue, IGlueConfig} from "@bluntsoftware/iglue";


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile:any ={};

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public auth:Auth,
              public iglue:IGlue ,
              public config:IGlueConfig,
              public loadingCtrl: LoadingController) {

    if(this.auth.authenticated){
      this.profile = auth.account;
    }
  }
  public profilePic(){
    let pic = this.profile.imgSrc;
    if(!pic){
      return "assets/imgs/no_pic.jpg";
    }else if(pic.startsWith("assets")){
      return this.config.url + "/" +  pic;
    }
    return pic;
  }
  public updateUrl(event){
      event.target.attributes.src.value ="assets/imgs/no_pic.jpg"
  }
  changeListener($event) : void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    let file:File = inputValue.files[0];
    let myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.profile.imgSrc = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  save(){
    this.iglue.account().save(this.profile).toPromise().then((data)=>{
      this.navCtrl.setRoot('NewsfeedPage');
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
