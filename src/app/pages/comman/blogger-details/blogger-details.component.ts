import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { ReviewDetailsComponent } from '../review-details/review-details.component';
import { SendInvitationComponent } from '../sendInvitation/sendInvitation.component';

@Component({
  selector: 'app-blogger-details',
  templateUrl: './blogger-details.component.html',
  styleUrls: ['./blogger-details.component.scss'],
})
export class BloggerDetailsComponent implements OnInit {
  @Input() mobileNo: object;
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };





  restaurantDetail: any = {};
  restauratMoblieNo: any;
  paymentOption = {
    cash: false,
    credit: false,
    paytm: false,
    upi: false,
  };
  position: any = {};

  constructor(
    private loginservice: LoginService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    navParams: NavParams,

    public modalCtrl: ModalController,


  ) {
    this.restauratMoblieNo = navParams.get('mobileNo');




  }


  goBack() {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });

  }
  ngOnInit() {

  }


  async presentReviewgModal() {
    const modal = await this.modalCtrl.create({
      component: ReviewDetailsComponent,
      componentProps: {

        // userDetails: this.userDetails,
      }
    });
    return await modal.present();
  }




  async sendInvitationModel() {
    const modal = await this.modalCtrl.create({
      component: SendInvitationComponent,
      componentProps: {

        restaurantDetail: this.restaurantDetail,
      }
    });
    return await modal.present();
  }


}
