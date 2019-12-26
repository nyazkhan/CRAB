import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { SearchComponent } from '../comman/search/search.component';
import { ProfileListComponent } from '../comman/profile-list/profile-list.component';
import { CommanModule } from '../comman/comman.module';
import { BloggerDetailsComponent } from '../comman/blogger-details/blogger-details.component';
import { BookedComponent } from '../comman/booked/booked.component';
import { InviteddetailsComponent } from '../comman/inviteddetails/inviteddetails.component';
import { SendInvitationComponent } from '../comman/sendInvitation/sendInvitation.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
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
  declarations: [DashboardPage],
  entryComponents: [SearchComponent,
    SendInvitationComponent, InviteddetailsComponent, BloggerDetailsComponent, ProfileListComponent, BookedComponent],

})
export class DashboardPageModule { }
