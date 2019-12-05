import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  phoneNo = '';
  // public PASSWORD_REGEX = '[789][0-9]{9}';

  seconds = 60;
  otp: string;
  timer: any;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(
    @Inject(AlertService) private alertService: AlertService,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
    // private storage: Storage,
    private storageService: StorageService

  ) {
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

