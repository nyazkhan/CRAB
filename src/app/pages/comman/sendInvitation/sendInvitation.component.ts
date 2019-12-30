import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { AddBloggerComponent } from '../add-blogger/add-blogger.component';
import { InviteddetailsComponent } from '../inviteddetails/inviteddetails.component';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-sendInvitation',
  templateUrl: './sendInvitation.component.html',
  styleUrls: ['./sendInvitation.component.scss'],
})
export class SendInvitationComponent implements OnInit {
  @Input() bloggerDetails: object;
  bloggerDetailsCopy: any = {};
  currentDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  maxDate = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  currentTime = (new Date()).getHours() + ':' + (new Date()).getMinutes();
  invitaionDetails = {
    toDate: this.currentDate,
    onTime: this.currentTime,
    to: null
  };

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    @Inject(AlertService) private alertService: AlertService,

    private loginservice: LoginService,
  ) {

    this.bloggerDetailsCopy = navParams.get('bloggerDetails');
    console.log(this.currentTime);

  }

  ngOnInit() { }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  async addBloggerModel() {
    const modal = await this.modalController.create({
      component: AddBloggerComponent,
      componentProps: {
        bloggerList: [this.bloggerDetailsCopy]
      }
    });
    return await modal.present();
  }

  sendInvitation() {
    if (!this.invitaionDetails.onTime) {
      this.alertService.showErrorAlert('Please Select Time');
      return;
    }
    if (!this.invitaionDetails.toDate) {
      this.alertService.showErrorAlert('Please Select Date');

      return;

    }


    // this.invitaionDetails.onTime = this.currentTime;
    this.invitaionDetails.to = this.bloggerDetailsCopy.id;
    this.loginservice.sendInvitaionToBlogger(this.invitaionDetails).subscribe((res) => {
      if (res.status === 200) {
        this.back();
        this.invitationDetailModel(res.data);
      }
    });
  }
  async invitationDetailModel(data) {
    const modal = await this.modalController.create({
      component: InviteddetailsComponent,
      componentProps: {
        invitation: data,
      }
    });
    return await modal.present();
  }


}
