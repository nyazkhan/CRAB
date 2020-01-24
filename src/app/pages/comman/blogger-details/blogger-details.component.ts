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
  @Input() userDetails: object;
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  aboutShow = false;
  detailsShow = false;
  reviewShow = false;
  inputDetails: any = {};


  bloggerDetails: any = {};
  restauratMoblieNo: any;
  paymentOption = {
    cash: false,
    credit: false,
    paytm: false,
    upi: false,
  };
  position: any = {};
  reviewList: any = [];
  constructor(
    private loginservice: LoginService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    navParams: NavParams,

    public modalCtrl: ModalController,


  ) {
    this.inputDetails = navParams.get('userDetails');

    if (this.inputDetails.isData) {
      this.bloggerDetails = this.inputDetails.data;
      this.reviewList = [];
      this.loginservice.getReviewListForBlogger(this.bloggerDetails.id).subscribe((res) => {
        this.reviewList = res.data;
      });
    } else {
      // if (this.inputDetails.mobileNo) {

      this.restauratMoblieNo = this.inputDetails.mobileNo;
      this.getBloggerDetails();

      // }


    }


  }


  goBack() {

    this.modalCtrl.dismiss({
      dismissed: true
    });

  }

  getBloggerDetails() {
    this.loginservice.getBlogerDetails(this.restauratMoblieNo).subscribe((res) => {
      if (res.status === 200) {
        this.bloggerDetails = res.data;
        this.reviewList = [];

        this.loginservice.getReviewListForBlogger(this.bloggerDetails.id).subscribe((sc) => {
          this.reviewList = sc.data;

        });
      } else {
        this.goBack();

      }
    });
  }

  ngOnInit() {

  }


  async presentReviewModal(reviewId) {
    const modal = await this.modalCtrl.create({
      component: ReviewDetailsComponent,
      componentProps: {

        reviewId: { id: reviewId },
      }
    });
    return await modal.present();
  }



  async sendInvitationModel() {
    const modal = await this.modalCtrl.create({
      component: SendInvitationComponent,
      componentProps: {

        bloggerDetails: this.bloggerDetails,
      }
    });
    return await modal.present();
  }


}
