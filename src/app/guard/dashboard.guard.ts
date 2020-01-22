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
    const userDetails = this.storageService.getData('userDetails');

    if (userDetails.status !== 5) {
      this.router.navigateByUrl('/registration');

    } else {
      return true;

    }
  }

}


