import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IonSlides, ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Storage } from '@ionic/storage';
import { CameraService } from 'src/app/service/camera.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  sameTimeForAll: boolean;
  curentDay = 0;
  slidesOpts = {
    pagination: false,
    // onlyExternal: false,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        // tslint:disable-next-line: no-shadowed-variable
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            // tslint:disable-next-line: max-line-length
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            // tslint:disable-next-line: max-line-length
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
            if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };



  seconds = 60;
  timer: any;

  restaurantDetail: any = {};

  paymentOption = {
    cash: false,
    credit: false,
    paytm: false,
    upi: false,
  };



  openOn = [

    {
      id: 1,
      day: 'Monday',
      isOpen: false,
      open: '',
      close: ''
    },
    {
      id: 2,
      day: 'Tuesday',
      isOpen: false,
      open: '',
      close: ''
    },
    {
      id: 3,
      day: 'Wednesday',
      isOpen: false,
      open: '',
      close: ''
    },
    {
      id: 4,
      day: 'Thursday',
      isOpen: false,
      open: '',
      close: ''
    },
    {
      id: 5,
      day: 'Friday',
      isOpen: false,
      open: '',
      close: ''
    },
    {
      id: 6,
      day: 'Saturday',
      isOpen: false,
      open: '',
      close: ''
    },
    {
      id: 7,
      day: 'Sunday',
      isOpen: false,
      open: '',
      close: ''
    },
  ];


  active: any;
  userPhoneNO = null;
  // openOn: any;
  selectedDayTime: any = {};
  nxtStage: any;
  constructor(
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(AlertService) private alertService: AlertService,
    public actionSheetController: ActionSheetController,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
    private storageService: StorageService,
    public cameraService: CameraService


  ) {
    this.loginservice.masterApi().subscribe((res) => {

    });

    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.nxtStage = res.data.stage - 4;
        this.editDetails(res.data.stage - 4);
        // this.next(res.data.stage);
        this.restaurantDetail = res.data;
        if (res.data.paymentOptions.length > 0) {
          res.data.paymentOptions.forEach(ele => {
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

        if (res.data.weekOpenDays.length > 0) {
          res.data.weekOpenDays.forEach(ele => {
            this.openOn.forEach(val => {
              // tslint:disable-next-line: triple-equals
              if (val.id == ele) {
                val.isOpen = true;
              }
            });
          });
        }
        if (res.data.openTiming.length > 0) {
          res.data.openTiming.forEach(ele => {
            this.openOn.forEach(val => {
              const times = ele.value.split('-');
              // tslint:disable-next-line: triple-equals
              if (val.id == ele.otherId) {
                val.open = times[0];
                val.close = times[1];
              }
            });
          });
        }
      }
    });


    // this.alertService.showLoader('Loading...');
  }
  updateObject(newObj) {
    this.restaurantDetail = newObj;
    console.log(this.restaurantDetail);
    this.nxtStage = this.restaurantDetail.stage - 4;
    this.editDetails(this.nxtStage);
  }
  ngOnInit() {
    // this.photoService.loadSaved();

    // this.slides.lockSwipes(true);
  }
  editDetails(id) {
    console.log(id);
    if (id === 12) {
      this.resendOtp();
    }

    this.slides.slideTo(id, 10);

  }
  next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  previous() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }


  getRestaurantById(id) {

  }


  saveRestName() {
    if (this.restaurantDetail.name === '') {
      this.alertService.showErrorAlert('Please Enter the Restaurant Name');
      return;
    }

    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 4,
      name: this.restaurantDetail.name
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }


    });

  }
  saveFoodType() {
    // tslint:disable-next-line: no-string-literal
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 5,
      foodType: this.restaurantDetail.foodType,
      isJain: this.restaurantDetail.isJain
    }).subscribe((res) => {
      if (res.data) {
        this.updateObject(res.data);
        // this.next();
      }

    });
  }

  saveRestType() {
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 6,
      restaurantType: this.restaurantDetail.restaurantType,
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }


    });
  }

  savePaymentType() {
    // tslint:disable-next-line: no-string-literal
    this.restaurantDetail.paymentOptions = [];
    if (!(this.paymentOption.cash || this.paymentOption.credit || this.paymentOption.paytm || this.paymentOption.upi)) {
      this.alertService.showErrorAlert('Please Select Payment Option');
      return;
    }
    // tslint:disable-next-line: no-string-literal
    if (this.paymentOption.cash) {

      this.restaurantDetail.paymentOptions.push('1');
    }
    if (this.paymentOption.credit) {

      this.restaurantDetail.paymentOptions.push('4');
    }
    if (this.paymentOption.paytm) {

      this.restaurantDetail.paymentOptions.push('2');
    }
    if (this.paymentOption.upi) {

      this.restaurantDetail.paymentOptions.push('3');
    }
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 7,
      paymentOptions: this.restaurantDetail.paymentOptions,
    }).subscribe((res) => {
      if (res.status === 200) {
        // this.next();
        this.updateObject(res.data);
      } else {
        this.alertService.showErrorAlert(res.message);
      }


    });
  }

  saveParking() {
    // tslint:disable-next-line: no-string-literal
    // this.restaurantDetail['parking'] = this.parking;
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 10,
      isParking: this.restaurantDetail.isParking
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }

  saveAboutRestaurant() {
    if (this.restaurantDetail.description === '') {
      this.alertService.showErrorAlert('Please Enter  Restaurant description');
      return;
    }

    // tslint:disable-next-line: no-string-literal
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 14,
      description: this.restaurantDetail.description
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });

  }

  SaveRestCapacity() {
    // tslint:disable-next-line: no-string-literal
    // this.restaurantDetail['restCapacity'] = this.restCapacity;
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 11,
      accommodationSize: this.restaurantDetail.accommodationSize
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }

  saveCost() {

    // tslint:disable-next-line: no-string-literal
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 12,
      avgCost: this.restaurantDetail.avgCost
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }

  sendEmailVerifycatioLink() {
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 15,
      email: this.restaurantDetail.email
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        this.resendOtp();
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }
  resendEmailOTP() {
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 15,
      email: this.restaurantDetail.email
    }).subscribe((res) => {
      if (res.status === 200) {
        // this.updateObject(res.data);
        // this.next();
        this.seconds = 60;
        this.timer = null;
        this.resendOtp();
        this.alertService.presentToast('OTP SEND');
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }

  changeSeconds() {
    if ((this.seconds < 60) && (this.seconds > 0)) {
      document.getElementById('timer').innerHTML = 'Resend OTP in ' + this.seconds.toString() + 'seconds';
    }
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      clearInterval(this.timer);

    }
  }

  resendOtp() {
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.changeSeconds();
      }, 1000);
    }
  }



  verifyEmailCode() {
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 16,
      email: this.restaurantDetail.email,
      code: this.restaurantDetail.code
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }


  // for day selection
  selectDays() {
    const days = this.openOn.filter(element => element.isOpen);
    console.log(days);
    this.restaurantDetail.weekOpenDays = [];
    days.forEach(element => {
      if (element.isOpen) {
        this.restaurantDetail.weekOpenDays.push(element.id);
      }
    });


    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 8,
      weekOpenDays: this.restaurantDetail.weekOpenDays
    }).subscribe((res) => {
      if (res.status === 200) {
        // this.updateObject(res.data);
        this.next();
        this.selectedDayTime = days[0];
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });


  }


  sendDay(day) {
    delete this.selectedDayTime;

    this.selectedDayTime = day;
  }


  setSametimeForAll(val) {
    if (!val) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.openOn.length; i++) {
        if (this.openOn[i].isOpen) {

          this.openOn[i].open = this.selectedDayTime.open;
          this.openOn[i].close = this.selectedDayTime.close;
        }

      }
    }

  }

  saveOpeningDaysANdTime() {


    this.restaurantDetail.openTiming = [];

    this.openOn.forEach(element => {
      if (element.isOpen) {
        this.restaurantDetail.openTiming.push({
          otherId: element.id,
          // tslint:disable-next-line: max-line-length
          value: new Date(this.openOn[0].open).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' - ' + new Date(this.openOn[0].close).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        });
      }
    });

    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 9,
      openTiming: this.restaurantDetail.openTiming

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }


  checkForRequiredFieldOnDay() {
    let er = 0;
    this.openOn.forEach(element => {
      if ((element.isOpen)) {
        if (((element.open === '') || (element.close === ''))) {
          er++;
        }
      }
    });

    if (er > 0) {
      this.alertService.showErrorAlert('Please Set Time For all Day');

    } else {
      this.saveOpeningDaysANdTime();
    }
  }
  openTime(val) {
    if (val) {
      this.openOn[this.curentDay].open = val;

    }

  }
  closeTime(val) {
    if (val) {
      this.openOn[this.curentDay].close = val;

    }

  }

  saveImg() {
    if (this.restaurantDetail.list[0].data.length < 1) {
      this.alertService.showErrorAlert('Please Upload indoor Image');
      return;
    }

    if (this.restaurantDetail.list[1].data.length < 1) {
      this.alertService.showErrorAlert('Please Upload Outdoor Image');
      return;
    }
    if (this.restaurantDetail.list[2].data.length < 1) {
      this.alertService.showErrorAlert('Please Upload Food Image');
      return;
    }
    if (this.restaurantDetail.list[3].data.length < 1) {
      this.alertService.showErrorAlert('Please Upload Menu Image');
      return;
    }
    this.editDetails(10);
  }



  isValidEmail() {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.restaurantDetail.email) === false) {
      // alert('Invalid Email Address');
      return false;
    }

    return true;

  }

  saveSocialProfile() {
    this.loginservice.updateRestaurantDetails({
      mobile: this.restaurantDetail.mobile,
      stage: 17,
      fbProfile: this.restaurantDetail.fbProfile,
      instaProfile: this.restaurantDetail.instaProfile,
      twitterProfile: this.restaurantDetail.twitterProfile,
      tripAdProfile: this.restaurantDetail.tripAdProfile,
      website: this.restaurantDetail.website
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });

  }

  async presentActionSheetForCamera(val) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Take Picture',
        // role: 'destructive',
        icon: 'camera',
        handler: () => {

          this.saveImage('camera', val);

        }
      }, {
        text: 'Gallery',
        // role: 'destructive',
        icon: 'images',
        handler: () => {

          this.saveImage('gallery', val);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  saveImage(from, type) {
    this.cameraService.takeImage(from).then((imgData) => {
      this.alertService.showLoader('Uploading Image');
      const images = new FormData();

      images.append('mobile', this.restaurantDetail.mobile);
      images.append('file', imgData);
      images.append('type', type);
      this.loginservice.uploadSingleImg(images).subscribe((res) => {
        this.updateObject(res.data);
        this.alertService.closeLoader();
      });
    });
  }
  deleteImgByid(id, i, j) {
    this.alertService.showLoader('Deleting Image ..');
    this.loginservice.deleteImgById(id).subscribe((res) => {
      if (res.status === 200) {
        this.restaurantDetail.list[i].data.splice(j, 1);
        this.alertService.closeLoader();

      }
    });
  }


  gotoDashboard() {

    if (this.restaurantDetail.status === 5) {

      this.router.navigateByUrl('/dashboard');
    }

    if (this.restaurantDetail.status === 2) {
      this.alertService.showInfoAlert( 'On Hold Becouse ..   ' + this.restaurantDetail.reason);
    }
    if (this.restaurantDetail.status === 4) {
      this.alertService.showInfoAlert( 'Please change The mention Contant..   ' + this.restaurantDetail.reason);
    }
    if (this.restaurantDetail.status === 3) {
      this.alertService.showInfoAlert('Rejected Becouse ..   ' + this.restaurantDetail.reason);
    }
  }
}
