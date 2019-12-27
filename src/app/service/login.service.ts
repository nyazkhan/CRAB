import { Injectable, Inject } from '@angular/core';
import { CustomHTTPService } from './custom-http.service';
import { InvitationPage } from '../pages/invitation/invitation.page';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(CustomHTTPService) private Http: CustomHTTPService) { }

  signUp(phoneNo) {
    return this.Http.post('user/save', { mobile: phoneNo, type: 1, appId: 1 });
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

  getBlogerDetails(phoneNo) {
    return this.Http.post('user/getUserDetails', { mobile: phoneNo, type: 2 });


  }

  masterApi() {
    return this.Http.post('master/data/get', [1, 2, 3, 4]);

  }

  uploadSingleImg(imgDetails) {
    return this.Http.post('file/uploadFile', imgDetails);

  }
  deleteImgById(id) {
    return this.Http.get('file/delete/' + id);

  }


  getBloggerList(obj) {
    return this.Http.post('search/all', obj);

  }


  // list of invitation
  listOfInvitation(obj) {
    return this.Http.post('search/all', obj);

  }


  // Invitation

  getInvitaionDetails(obj) {
    return this.Http.post('search/all', obj);

  }


  // list of booking
  listOfBooking(obj) {
    return this.Http.post('search/all', obj);

  }
  // bokking
  getBookingDetails(obj) {
    return this.Http.post('search/all', obj);

  }






}
