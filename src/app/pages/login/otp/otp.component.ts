import { Component, OnInit, Inject, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { AfterLoginComponent } from '../after-login/after-login.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @Input() phone: object;

  phoneNo = '';
  // public PASSWORD_REGEX = '[789][0-9]{9}';
  phoneObject: any = {};
  seconds = 60;
  otp: string;
  timer: any;
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
    public modalController: ModalController,
    private storageService: StorageService,
    navParams: NavParams,

  ) {

    this.phoneObject = navParams.get('phone');
    this.phoneNo = this.phoneObject.phone;
  }

  ngOnInit() {
    this.resendOtp();

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.seconds = 60;
    this.timer = null;
    this.modalController.dismiss({
      dismissed: true
    });
  }


  otpSummit() {
    this.alertService.showLoader(' Verifying OTP ..');
    this.loginservice.verifyOTP(this.phoneNo, this.otp).subscribe((res) => {

      if (res.data) {
        for (const key of Object.keys(res.data)) {
          this.storageService.storeData(key, res.data[key]);
        }
        this.dismiss();
        if (res.data.stage !== 3) {

          this.presentAfterloginModal();
        } else {

          this.router.navigateByUrl('/dashboard');
        }

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


  changeSeconds() {
    // if ((this.seconds < 60) && (this.seconds > 0)) {
    //   document.getElementById('timer').innerHTML = 'OTP will expire in ' + this.seconds.toString() + 'seconds';
    // }
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      clearInterval(this.timer);

    }
  }
  async presentAfterloginModal() {
    const modal = await this.modalController.create({
      component: AfterLoginComponent,
      componentProps: {

        // bloggerList: this.listOfBlogger,
      }
    });
    return await modal.present();
  }

  resendOtp() {
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.changeSeconds();
      }, 1000);
    }
  }


}
