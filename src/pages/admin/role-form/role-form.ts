import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IGlueConfig} from "@bluntsoftware/iglue";

/**
 * Generated class for the RoleFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-role-form',
  templateUrl: 'role-form.html',
})
export class RoleFormPage {
  public model:any = {};
  form:FormGroup;
  isReadyToSave:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public formBuilder: FormBuilder,public config:IGlueConfig) {

    this.model = navParams.get('item');
    console.log(this.model);
    if(!this.model){
      this.model = {};
    }

    this.form = formBuilder.group({
      authority: ['', Validators.required],

    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoleFormPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.model);
  }
}
