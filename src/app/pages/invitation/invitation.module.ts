import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvitationPage } from './invitation.page';
import { InviteddetailsComponent } from '../comman/inviteddetails/inviteddetails.component';
import { CommanModule } from '../comman/comman.module';

const routes: Routes = [
  {
    path: '',
    component: InvitationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    CommanModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvitationPage],
  entryComponents: [InviteddetailsComponent]
})
export class InvitationPageModule {}
