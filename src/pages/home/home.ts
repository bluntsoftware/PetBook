import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public auth: Auth,public iglue:IGlue,public alertCtrl:AlertController) {
    let that = this;
    if(this.auth.authenticated){
      that.navCtrl.setRoot('MenuPage');
    }
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
      alert(response.error);
    });
  }
  validateEmail(data) {
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(data.email) ){
      return {
        isValid: true,
        message: ''
      };
    } else {
      return {
        isValid: false,
        message: 'Email address is required'
      }
    }
  }
  forgotPassword(){
    let alertCtrl = this.alertCtrl.create({
      title: 'Forgot Password',
      message: 'Please enter your email address',
      inputs: [{name: 'email', placeholder: 'email'}],
      buttons: [
        { text: 'Cancel', role: 'cancel', handler: () => {
        }},
        { text: 'Ok', handler:(data) => {
            let validation = this.validateEmail(data);
            if (!validation.isValid) {
              alertCtrl.setMessage(validation.message);
              return false;
            }else{
               this.iglue.user().resetPassword(data).then(()=>{
                 alert("please check your email for password reset");
               }).catch((err)=>{
                 alert(err.error);
               });
            }
        }}
      ]
    });
    alertCtrl.present();
  }
}
