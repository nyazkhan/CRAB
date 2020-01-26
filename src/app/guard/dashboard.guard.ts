import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    @Inject(StorageService) private storageService: StorageService,
    private router: Router,
    private loginservice: LoginService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const stage = this.storageService.getData('stage');
    const userDetails = this.storageService.getData('userDetails');
    const edit = this.storageService.getData('edit');
    if (userDetails.status !== 5) {

      if ((3 < stage)) {
        this.router.navigateByUrl('/registration');
      }
      if (stage === 3) {

        this.router.navigateByUrl('/map');
      }
    } else {
      if (edit) {

        this.router.navigateByUrl('/registration');
      } else {
        return true;
      }

    }
  }


}


