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

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  // getRestaurantDetails() {
  //   this.loginservice.restaurantDetails({
  //     mobile: this.restauratMoblieNo,
  //     type: 1,
  //     lat: 23.046549499999998,
  //     lon: 72.5393268
  //   }).subscribe((res) => {
  //     console.log(res);
  //     if (res.status === 200) {
  //       this.sliderOne = {
  //         isBeginningSlide: true,
  //         isEndSlide: false,
  //         slidesItems: []
  //       };
  //       this.restaurantDetail = res.data;
  //       console.log(res);
  //       this.restaurantDetail.list.forEach(element => {
  //         element.data.forEach(elem => {
  //           this.sliderOne.slidesItems.push(elem.storagePath);
  //         });
  //       });
  //       console.log(this.sliderOne);

  //       if (this.restaurantDetail.paymentOptions.length > 0) {
  //         this.restaurantDetail.paymentOptions.forEach(ele => {
  //           // tslint:disable-next-line: triple-equals
  //           if (ele == 1) {
  //             this.paymentOption.cash = true;

  //           }
  //           // tslint:disable-next-line: triple-equals
  //           if (ele == 2) {
  //             this.paymentOption.paytm = true;

  //           }
  //           // tslint:disable-next-line: triple-equals
  //           if (ele == 3) {
  //             this.paymentOption.upi = true;

  //           }
  //           // tslint:disable-next-line: triple-equals
  //           if (ele == 4) {
  //             this.paymentOption.credit = true;

  //           }
  //         });
  //       }


  //     }
  //   });
  // }

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




  async bookTableModel() {
    const modal = await this.modalCtrl.create({
      component: SendInvitationComponent,
      componentProps: {

        restaurantDetail: this.restaurantDetail,
      }
    });
    return await modal.present();
  }


}
