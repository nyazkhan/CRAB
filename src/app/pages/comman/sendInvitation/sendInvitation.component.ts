import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { BookedComponent } from '../booked/booked.component';
import { AddBloggerComponent } from '../add-blogger/add-blogger.component';
import { InviteddetailsComponent } from '../inviteddetails/inviteddetails.component';

@Component({
  selector: 'app-sendInvitation',
  templateUrl: './sendInvitation.component.html',
  styleUrls: ['./sendInvitation.component.scss'],
})
export class SendInvitationComponent implements OnInit {
  @Input() restaurantDetail: object;
  restaurantListCopy: any = {};



  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
  ) {

    this.restaurantListCopy = navParams.get('restaurantDetail');

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

      }
    });
    return await modal.present();
  }

  sendInvitation() {

  }
  async invitationDetailModel() {
    const modal = await this.modalController.create({
      component: InviteddetailsComponent,
      componentProps: {

      }
    });
    return await modal.present();
  }


}
