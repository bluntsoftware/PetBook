import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Auth, Conduit, IGlue, IGlueConfig} from "@bluntsoftware/iglue";


/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  users:any[];
  friends:any[];
  loading:any;
  baseUrl:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public conduit:Conduit,
              public auth:Auth,public loadingCtrl: LoadingController,public iglue :IGlue,
              public config:IGlueConfig) {

    let that = this;
    this.baseUrl = config.url;

    this.auth.isAuthenticated().then(()=>{
      that.list();
    }).catch((err)=>{
      alert(err);
    });
  }


  public updateUrl(event){
      event.target.attributes.src.value ="assets/imgs/no_pic.jpg"
  }
  requestFriend(user){
      this.iglue.account().friendRequest(user).toPromise().then((data)=>{
        this.list();
      }).catch((err)=>{
        alert("friend request error -> " + err );
     });
  }
  acceptFriendRequest(user){
    this.iglue.account().addFriend(user).toPromise().then((data)=>{
      this.list();
    });
  }

  removeFriend(user){
    this.iglue.account().removeFriend(user).toPromise().then(()=>{
      this.list();
    }).catch((err)=>{
      alert("remove friend error -> " + err );
    });
  }

  accountContainsUser(user){
    if(this.auth.authenticated){
      if(this.auth.account.login  === user.login){
        return true;
      }
      //Don't show administrator
      if(user.login === 'admin'){
        return true;
      }
      if(this.friends){
        for(let friend of this.friends){
          if(friend.login  === user.login){
            return true;
          }
        }
      }
    }
    return false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }
  list(){
    this.loading = this.loadingCtrl.create({
      content: 'gathering users...'
    });
    this.loading.present();
    this.iglue.account().listFriends().subscribe((data) => {
      this.friends = data;
      this.listUsers();
    });
  }

  listByState(state){
    const friends:any[] = [];
    if(this.friends){
      for(let friend of this.friends){
        if(friend.state === state){
          friends.push(friend);
        }
      }
    }
    return friends;
  }


  listUsers(){
    this.iglue.account().users().toPromise().then((data)=>{
      try{
        this.users = data.rows;
        this.loading.dismiss();
      }catch(err){
        alert(err);
      }
    });
  }
}
