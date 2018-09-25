import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Auth, IGlue} from '@bluntsoftware/iglue';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  signup: { email: string, password: string,firstName :string,lastName:string } = {
    firstName: '',
    lastName:'',
    password: '',
    email:''
  };

  constructor(public navCtrl: NavController,public auth: Auth,public iglue:IGlue) {
    let that = this;
    this.auth.isAuthenticated().then(()=>{
      that.navCtrl.setRoot('MenuPage');
    }).catch(()=>{

    });
  }
  doLogin() {
    const that = this;
    this.auth.login(this.account.email,this.account.password).then(
      (account) => {
        that.navCtrl.setRoot('MenuPage');
      },
      (err) => {
        alert(err.statusText);
      });
  }
  doSignup() {

    this.iglue.userService.register(this.signup).then((data)=>{
      alert("Check your email to activate your account");
    }).catch((response)=>{
      this.navCtrl.push(HomePage);
      // Unable to sign up
      //console.log(response);
      alert(response.error);
    });
  }
}
