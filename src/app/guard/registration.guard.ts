import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(
    @Inject(StorageService) private storageService: StorageService,
    private router: Router,
    private loginservice: LoginService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const stage = this.storageService.getData('stage');
    console.log(stage + '    567');
    const userDetails = this.storageService.getData('userDetails');

    // if ((stage < 18) && (3 < stage)) {

    //   return true;
    // } else {

    //   const userDetails = this.storageService.getData('userDetails');

    //   if (userDetails.status !== 5) {
    //   }
    //   if ((stage >= 18)) {

    //     this.router.navigateByUrl('/dashboard');
    //   }
    // }

    if (userDetails.status !== 5) {

      if ((3 < stage)) {
        return true;
      }
      if (stage === 3) {

        this.router.navigateByUrl('/map');
      }
    } else {
      this.router.navigateByUrl('/dashboard');

    }
  }


}
