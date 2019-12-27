import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // @Input() mobileNo: object;
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
    // @Inject(NavParams)  public navParams: NavParams,
    private storageService: StorageService,

    public modalCtrl: ModalController,


  ) {
    this.restauratMoblieNo = this.storageService.getData('mobile');


    // position.coords.latitude, position.coords.longitude
    this.getRestaurantDetails();



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

  getRestaurantDetails() {
    this.loginservice.getUserDetails(this.restauratMoblieNo).subscribe((res) => {
      console.log(res);
      if (res.status === 200) {
        this.sliderOne = {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems: []
        };
        this.restaurantDetail = res.data;
        console.log(res);
        this.restaurantDetail.list.forEach(element => {
          element.data.forEach(elem => {
            this.sliderOne.slidesItems.push(elem.storagePath);
          });
        });
        console.log(this.sliderOne);

        if (this.restaurantDetail.paymentOptions.length > 0) {
          this.restaurantDetail.paymentOptions.forEach(ele => {
            // tslint:disable-next-line: triple-equals
            if (ele == 1) {
              this.paymentOption.cash = true;

            }
            // tslint:disable-next-line: triple-equals
            if (ele == 2) {
              this.paymentOption.paytm = true;

            }
            // tslint:disable-next-line: triple-equals
            if (ele == 3) {
              this.paymentOption.upi = true;

            }
            // tslint:disable-next-line: triple-equals
            if (ele == 4) {
              this.paymentOption.credit = true;

            }
          });
        }


      }
    });
  }

  goBack() {

    this.router.navigateByUrl('/dashboard');

  }
  ngOnInit() {

  }
}
