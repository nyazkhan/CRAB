import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { AlertService } from 'src/app/service/alert.service';
import { BloggerDetailsComponent } from '../blogger-details/blogger-details.component';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent implements OnInit {

  // Data passed in by componentProps
  @Input() booking: object;
  bookingDetails: any = {};
  cancelButtonClick = false;
  presentButtonClick = false;
  absentButtonClick = false;
  hideButtons = false;

  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,
    @Inject(AlertService) private alertService: AlertService,


  ) {

    this.bookingDetails = navParams.get('booking');
  }

  changeBookingStatus(statusId) {
    this.cancelButtonClick = false;
    this.presentButtonClick = false;
    this.absentButtonClick = false;
    this.hideButtons = false;
    this.loginservice.updateBookingStatus({
      id: this.bookingDetails.id,
      status: statusId
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.bookingDetails.status = statusId;
        if (statusId === 10) {

          this.alertService.presentToast('Accept Booking Request Successfuly');
        }
        if (statusId === 3) {

          this.alertService.presentToast('Reject Booking Request Successfuly', '#ff0000');
        }
        if (statusId === 7) {

          this.alertService.presentToast(' Booking Status Change Successfuly');
        }
        if (statusId === 8) {

          this.alertService.presentToast(' Booking Status Change Successfuly');
        }
      }
    });
  }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  async openBloggerDetailsModel() {
    const modal = await this.modalController.create({
      component: BloggerDetailsComponent,
      componentProps: {

        userDetails: {
          isData: true, data: this.bookingDetails.userDetails, mobileNo: null,
        },

        // bloggerDetails: this.bloggerDetails,
      }
    });
    return await modal.present();
  }



}
