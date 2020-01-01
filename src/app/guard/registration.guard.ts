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

    if ((stage < 17) && (3 < stage)) {
      console.log(stage + '      [[[[[[[');

      return true;
    } else {

      console.log(stage + '  el    [[[[[[[');

      if (stage >= 17) {
        console.log(stage + '  if    [[[[[[[');

        this.router.navigateByUrl('/dashboard');
      }
    }

  }

}
