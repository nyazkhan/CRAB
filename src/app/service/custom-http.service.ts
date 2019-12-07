import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
// import { BASEURL } from './app.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomHTTPService {

  // url: string = BASEURL;
  url = 'http://139.59.18.149:8282/crab';
  constructor(public http: HttpClient, public storage: StorageService, public router: Router, public alertService: AlertService) { }

  getHeaders(optHeaders?: HttpHeaders) {
    let headers = new HttpHeaders();
    if (this.storage.getData('accessToken')) {
      headers = headers.set('crab_at', this.storage.getData('accessToken')
      );
    }
    if (optHeaders) {
      for (const optHeader of optHeaders.keys()) {
        headers = headers.append(optHeader, optHeaders.get(optHeader));
      }
    }
    return headers;
  }

  get(endpoint: string, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .get(this.url + '/' + endpoint, { headers: header, observe: 'response' })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  post(endpoint: string, body: any, optHeaders?: HttpHeaders) {

    const header = this.getHeaders(optHeaders);
    return this.http
      .post(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response',
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }



  // postLogin(endpoint: string, body: any) {
  //   // const header = this.getHeaders(optHeaders);
  //   let Headers = new HttpHeaders();
  //   Headers = Headers.set(
  //     'fb_at',
  //     '6abbe313-8f13-42b2-993f-8f50b210b8fc-y7oPDwXZOewcdzG2IJ+35u1wy6OZxQp9AguwKJhnU38='
  //   );
  //   Headers = Headers.set(
  //     'Content-Type', 'application/json');

  //   return this.http
  //     .post(this.url + '/' + endpoint, body, {
  //       headers: Headers,
  //       observe: 'response',
  //     })
  //     .pipe(map(this.extractData), catchError(this.handleError));

  // }

  put(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response'
      }).pipe(map(this.extractData), catchError(this.handleError));

  }

  delete(endpoint: string, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .delete(this.url + '/' + endpoint, {
        headers: header,
        observe: 'response'
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  patch(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response'
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  extractData = (response: HttpResponse<any>) => {
    if (response.body.status === 200 || response.body.status === 204) {
      return response.body || response.status;
    } else {
      this.alertService.showErrorAlert(response.body.message);
      return response.body;
    }

  }

  handleError = (errorResponse: HttpErrorResponse) => {
    console.log(errorResponse);

    switch (errorResponse.status) {
      case 401:
        this.router.navigate(['/login']).then(() => {
          this.alertService.showErrorAlert(errorResponse.error.message);
        });
        this.storage.clearData();
        break;
      case 0:
        this.alertService.showErrorAlert('You don\'t seem to have an active internet connection. Please connect and try again.');
        break;
      default:
        this.alertService.showErrorAlert(errorResponse.error.message);
        break;
    }
    return throwError(errorResponse);
  }
}
