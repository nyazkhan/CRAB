import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { CustomHTTPService } from './custom-http.service';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    User: any;

    constructor(public api: CustomHTTPService, public storage: StorageService) { }

    login(phoneNo) {
        return this.api.post('user/save', { mobile: phoneNo, type: 1, name: 'nyaz khan' }).pipe(map(response => {
            if (response.data) {

                this._loggedIn(response);
                return response;
            } else {
                return null;
            }
        }));
    }

    logout() {
        this.storage.storeData('accessToken', null);
        // this.storage.storeData('ngStorage-privileges', null);
        this.User = null;
        this.storage.clearData();
        // location.reload();
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(resp) {
        this.storage.storeData('accessToken', resp.data.accessToken);
        this.User = resp.user;
    }

    isLoggedIn() {
        return localStorage.getItem('accessToken') ? true : false;
    }
}

