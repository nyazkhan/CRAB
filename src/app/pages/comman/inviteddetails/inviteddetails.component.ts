import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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

  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,
    private router: Router,
    @Inject(AlertService) private alertService: AlertService,


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

  cancelInvitaion() {
    this.cancelButtonClick = false;
    this.loginservice.updateInvitationStatus({
      id: this.invitationDetails.id,
      status: 2
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.invitationDetails.status = 2;
        this.alertService.presentToast('Cancel Invitation Successfuly', '#ff0000');

      }
    });
  }

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
          isData: true, data: this.invitationDetails.userDetails, mobileNo: null,
        },

        // bloggerDetails: this.bloggerDetails,
      }
    });
    return await modal.present();
  }



}
