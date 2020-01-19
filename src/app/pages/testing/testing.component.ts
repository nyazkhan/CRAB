import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {

  phoneNo = '';
  // public PASSWORD_REGEX = '[789][0-9]{9}';

  seconds = 60;
  otp: string;
  timer: any;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 200,

  };

  slideNo = 1;
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
    // private storage: Storage,
    private storageService: StorageService

  ) {

    this.slidesSpeed();
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
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


  slidesSpeed() {
    // setInterval(() => {
    //   if (this.slideNo === 3) {
    //     this.slides.slideTo(0, 10);
    //     this.slideNo = 1;
    //   } else {

    //     this.next();
    //   }
    //   console.log(this.slideNo);

    //   this.slideNo++;
    // }, 20);
  }
  isValidPhone() {
    const reg = /^\d{10}$/;

    if (reg.test(this.phoneNo) === false) {
      // alert('Invalid Email Address');
      return false;
    }

    return true;

  }


  onSignInSubmit() {
    if (this.phoneNo === '') {
      this.alertService.showErrorAlert('Please Enter Mobile No');
      return;
    }
    if (!this.isValidPhone()) {
      this.alertService.showErrorAlert('Please Enter Valid Mobile No');
      return;
    }

    this.alertService.showLoader('OTP sending..');
    this.loginservice.signUp(this.phoneNo).subscribe((res) => {
      if (res.status === 200) {
        this.next();
        this.resendOtp();
      }
      this.alertService.closeLoader();

    }, (err) => {

      this.alertService.closeLoader();

    });
  }


  otpSummit() {
    this.alertService.showLoader(' Verifying OTP ..');
    this.loginservice.verifyOTP(this.phoneNo, this.otp).subscribe((res) => {

      if (res.data) {
        for (const key of Object.keys(res.data)) {
          this.storageService.storeData(key, res.data[key]);
        }
        this.next();
      }
      this.alertService.closeLoader();

    }, (err) => {
      this.alertService.closeLoader();

    });
  }

  resendOTP() {
    this.loginservice.resendOTP(this.phoneNo).subscribe((res) => {
      this.seconds = 60;
      this.timer = null;
      this.resendOtp();
      this.alertService.presentToast('OTP SEND');

    });
  }

  ngOnInit() {

  }
  goToMap() {

    this.slides.slideTo(0, 1000);
    this.router.navigateByUrl('/map');

  }


  changeSeconds() {
    if ((this.seconds < 60) && (this.seconds > 0)) {
      document.getElementById('timer').innerHTML = 'OTP will expire in ' + this.seconds.toString() + 'seconds';
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


}

