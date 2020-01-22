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
import { AlertService } from 'src/app/service/alert.service';
import { BlockSlotsComponent } from '../comman/block-slots/block-slots.component';

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

  commingInvitation: any = [];
  commingBooking: any = [];
  commingAppointments: any = [];


  constructor(
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
    @Inject(AlertService) private alertService: AlertService,

  ) {
    this.loginservice.masterApi().subscribe((res) => {

    });

    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.restaurantDetails = res.data;
      }
    });
    this.loginservice.getReviewList().subscribe((res) => {

    });
    this.appointments();
  }


  appointments() {
    this.commingBooking = [];
    this.commingInvitation = [];
    this.commingAppointments = [];
    this.loginservice.upCommingAppointents({
      searchType: 1,
      status: 10,
      durationType: 1,

    }).subscribe((res) => {
      if (res.status === 200) {
        this.commingInvitation = res.data;

        this.loginservice.upCommingAppointents({
          searchType: 2,
          status: 10,
          durationType: 1,

        }).subscribe((resp) => {
          if (resp.status === 200) {
            this.commingBooking = res.data;
            this.commingAppointments = res.data.concat(resp.data);
            this.commingAppointments.sort((a , b) => {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              const date1 = new Date(a.toDate);
              const date2 = new Date(b.toDate);
              return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;            });
            console.log(this.commingAppointments);

          }
        });
      }
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

        userDetails: {
          isData: false, data: {}, mobileNo: mobile,
        },
      }
    });
    return await modal.present();
  }


  goToAppointment(val) {
    if (!val.persons) {
      this.presentInvitationDetailModal(val);
    }

    if (val.persons) {
      this.presentBookingModal(val);
    }
  }

  async presentBookingModal(val) {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        booking: val,
      }
    });
    return await modal.present();
  }

  async presentInvitationDetailModal(val) {
    const modal = await this.modalController.create({
      component: InviteddetailsComponent,
      componentProps: {

        invitation: val,
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
