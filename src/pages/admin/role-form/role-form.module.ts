import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleFormPage } from './role-form';

@NgModule({
  declarations: [
    RoleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleFormPage),
  ],
})
export class RoleFormPageModule {}
