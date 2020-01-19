import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { BloggerDetailsComponent } from '../blogger-details/blogger-details.component';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-inviteddetails',
  templateUrl: './inviteddetails.component.html',
  styleUrls: ['./inviteddetails.component.scss'],
})
export class InviteddetailsComponent implements OnInit {

  // Data passed in by componentProps
  @Input() invitation: object;
  invitationDetails: any = {};

  cancelButtonClick = false;
  presentButtonClick = false;
  absentButtonClick = false;
  reviewButtonClick = false;
  hideButtons = false;
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,
    private router: Router,
    @Inject(AlertService) private alertService: AlertService,
    public alertController: AlertController

  ) {

    this.invitationDetails = navParams.get('invitation');
  }

  getInvitaionDetail() {
    this.loginservice.getInvitaionDetails({}).subscribe((res) => {
      if (res === 200) {

      }
    });
  }

  ngOnInit() { }


  changeInvitationStatus(statusId) {
    this.cancelButtonClick = false;
    this.presentButtonClick = false;
    this.absentButtonClick = false;
    this.hideButtons = false;
    this.reviewButtonClick = false;
    this.loginservice.updateInvitationStatus({
      id: this.invitationDetails.id,
      status: statusId
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.invitationDetails.status = statusId;
        if ((statusId === 7) || (statusId === 8)) {

          this.alertService.presentToast('Status change Successfuly', '#ff0000');
        }
        if (statusId === 17) {

          this.alertService.presentToast('Cancel Invitation Successfuly', '#ff0000');
        }

      }
    });
  }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  sendReviewRequest(paidUnPaid) {
    this.loginservice.sendReviewRequest({
      invitationId: this.invitationDetails.id,
      to: this.invitationDetails.userDetails.id,
      reviewType: paidUnPaid
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.invitationDetails.status = 9;
        this.alertService.presentToast('Review Request Sent Successfuly', '#ff0000');

      }
    });
  }



  async openBloggerDetailsModel() {
    const modal = await this.modalController.create({
      component: BloggerDetailsComponent,
      componentProps: {

        userDetails: {
          isData: true, data: this.invitationDetails.userDetails, mobileNo: null,
        },

        // bloggerDetails: this.bloggerDetails,
      }
    });
    return await modal.present();
  }


  checkPaidUnPaid() {


    if (this.invitationDetails.userDetails.reviewType === 3) {
      this.reviewButtonClick = true;
      this.hideButtons = true;
      return;
    }
    this.sendReviewRequest(this.invitationDetails.userDetails.reviewType);

  }
}
