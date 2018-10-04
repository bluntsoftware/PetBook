import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IGlueConfig} from "@bluntsoftware/iglue";

/**
 * Generated class for the UserFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserFormPage {
  public model:any = {};
  form:FormGroup;
  isReadyToSave:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,formBuilder: FormBuilder,public config:IGlueConfig) {
    this.model = navParams.get('item');
    if(!this.model){
      this.model = {};
    }

    this.form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:[''],
      login:['', Validators.required],
      activated:[false]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }
  public updateUrl(event){
    event.target.attributes.src.value ="assets/imgs/no_pic.jpg"
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFormPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.model);
  }
}
