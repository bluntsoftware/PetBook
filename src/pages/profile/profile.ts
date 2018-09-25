import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Auth, IGlue} from "@bluntsoftware/iglue";


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
              public iglue:IGlue ) {
    this.profile = auth.account;
  }
  public updateUrl(event){
    event.target.attributes.src.value ="assets/imgs/no_pic.jpg"
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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

    });
  }
}
