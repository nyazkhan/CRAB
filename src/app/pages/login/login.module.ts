import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AfterLoginComponent } from './after-login/after-login.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage, AfterLoginComponent, OtpComponent],
  entryComponents: [AfterLoginComponent, OtpComponent]
})
export class LoginPageModule { }
