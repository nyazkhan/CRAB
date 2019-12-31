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
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,
    @Inject(AlertService) private alertService: AlertService,


  ) {

    this.bookingDetails = navParams.get('booking');
  }

  // PENDING(1, "Pending"),
  // HOLD(2, "Hold"),
  // REJECTED(3, "Reject"),
  // REVERTED(4, "Reverted"),
  // APPROVED(5, "Approved");
  cancelBooking() {
    this.cancelButtonClick = false;
    this.loginservice.updateBookingStatus({
      id: this.bookingDetails.id,
      status: 4
    }).subscribe((res) => {
      if (res.status === 200) {
        this.alertService.presentToast('Reject Booking Request Successfuly' , '#ff0000');
        console.log(res.data);
        this.bookingDetails.status = 4;
      }
    });
  }
  acceptBooking() {
    this.loginservice.updateBookingStatus({
      id: this.bookingDetails.id,
      status: 5
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.bookingDetails.status = 5;
        this.alertService.presentToast('Accept Booking Request Successfuly');

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
