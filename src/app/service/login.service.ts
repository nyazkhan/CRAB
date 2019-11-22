import { Injectable, Inject } from '@angular/core';
import { CustomHTTPService } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(CustomHTTPService) private Http: CustomHTTPService) { }

  signUp(phoneNo) {
    return this.Http.postLogin('user/save', { mobile: phoneNo, type: 1, name: 'nyaz khan' });
  }
  verifyOTP(phoneNo, OTP) {
    return this.Http.post('notification/verify/otp', { mobile: phoneNo, otp: OTP, });

  }
  resendOTP(phoneNo) {
    return this.Http.post('notification/send/otp', { mobile: phoneNo });

  }

  updateRestaurantDetails(details) {
    return this.Http.post('user/updateRestaurantDetails', details);

  }

  getUserDetails(phoneNo) {
    return this.Http.post('user/getUserDetails', { mobile: phoneNo, type: 1 });

  }


  masterApi() {
    return this.Http.postLogin('master/data/get', [1, 2, 3, 4]);

  }

  uploadSingleImg(imgDetails) {
    return this.Http.post('user/getUserDetails', imgDetails);

  }
  deleteImgById(id) {
    return this.Http.get('file/delete/' + id);

  }

}
