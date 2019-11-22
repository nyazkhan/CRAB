import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  phoneNo = '';
  // public PASSWORD_REGEX = '[789][0-9]{9}';

  otp: string;

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(
    @Inject(AlertService) private alertService: AlertService,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
    private storage: Storage

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
    console.log('its call');
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
      console.log(res);
      this.alertService.closeLoader();
      this.next();
      if (res.status === 200) {

      } else {
        this.alertService.showErrorAlert(res.message);
      }


    }, (err) => {

      this.alertService.closeLoader();

    });
  }


  otpSummit() {
    this.alertService.showLoader(' Verifying OTP ..');
    this.loginservice.verifyOTP(this.phoneNo, this.otp).subscribe((res) => {

      if (res.status === 200) {
        this.next();
        this.storage.set('userNO', this.phoneNo);
      } else {
        this.alertService.showErrorAlert(res.message);
      }
      this.alertService.closeLoader();

    }, (err) => {
      this.alertService.closeLoader();

    });
  }

  resendOTP() {
    this.loginservice.resendOTP(this.phoneNo).subscribe((res) => {
      if (res.status === 200) {
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }

  ngOnInit() {

  }
  goToMap() {

    this.slides.slideTo(0, 1000);
    this.router.navigateByUrl('/map');

  }
}

