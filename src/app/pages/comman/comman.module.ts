import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { BloggerDetailsComponent } from './blogger-details/blogger-details.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { BookedComponent } from './booked/booked.component';
import { IonicModule } from '@ionic/angular';
import { SendInvitationComponent } from './sendInvitation/sendInvitation.component';
import { FormsModule } from '@angular/forms';
import { InviteddetailsComponent } from './inviteddetails/inviteddetails.component';
import { AddBloggerComponent } from './add-blogger/add-blogger.component';
import { BlockSlotsComponent } from './block-slots/block-slots.component';



@NgModule({
  declarations: [
    SearchComponent,
    SendInvitationComponent,
    ReviewDetailsComponent,
    BloggerDetailsComponent,
    ProfileListComponent,
    BlockSlotsComponent,
    BookedComponent,
    AddBloggerComponent,
    InviteddetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,

  ],
  exports: [
    SearchComponent,
    ReviewDetailsComponent,
    SendInvitationComponent,
    BloggerDetailsComponent,
    AddBloggerComponent,
    ProfileListComponent,
    BlockSlotsComponent,
    BookedComponent,
    InviteddetailsComponent],
  entryComponents: [ReviewDetailsComponent, BloggerDetailsComponent, AddBloggerComponent, SendInvitationComponent],

})
export class CommanModule { }
