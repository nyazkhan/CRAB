import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from '../comman/search/search.component';
import { ProfileListComponent } from '../comman/profile-list/profile-list.component';
import { BloggerDetailsComponent } from '../comman/blogger-details/blogger-details.component';
import { BookedComponent } from '../comman/booked/booked.component';
import { InviteddetailsComponent } from '../comman/inviteddetails/inviteddetails.component';
import { SendInvitationComponent } from '../comman/sendInvitation/sendInvitation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userPhoneNO = null;
  restaurantDetails: any = {};
  listOfBlogger: any = [];

  position: any = {};




  constructor(
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,

  ) {


    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.restaurantDetails = res.data;
      }
    });
    this.loginservice.getAllBooking().subscribe((res) => {

    });
  }
  async presentBloggerSearchModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      componentProps: {

        bloggerList: this.listOfBlogger,
      }
    });
    return await modal.present();
  }
  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileListComponent,
      componentProps: {

        restaurantDetails: this.restaurantDetails,
      }
    });
    return await modal.present();
  }
  async presentBloggerDetailsModal(mobile) {
    const modal = await this.modalController.create({
      component: BloggerDetailsComponent,
      componentProps: {

        mobileNo: mobile,
      }
    });
    return await modal.present();
  }


  goToAppointment(val) {
    if (val === 'invitaion') {
      this.presentInvitationDetailModal();
    }

    if (val === 'booked') {
      this.presentBookingModal();
    }
  }

  async presentBookingModal() {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        // restaurantDetails: this.restaurantDetails,
      }
    });
    return await modal.present();
  }

  async presentInvitationDetailModal() {
    const modal = await this.modalController.create({
      component: InviteddetailsComponent,
      componentProps: {

        // invitation: this.restaurantDetails,
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getListOfBloggers();
  }

  getListOfBloggers() {
    this.loginservice.getBloggerList(
      {
        name: '',
        searchType: 2
      }
    ).subscribe((res) => {
      if (res.status === 200) {
        this.listOfBlogger = res.data;
        console.log(res);

      }
    });



  }

}
