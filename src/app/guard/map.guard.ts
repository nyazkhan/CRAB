import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoginService } from '../service/login.service';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MapGuard implements CanActivate {
  constructor(
    @Inject(StorageService) private storageService: StorageService,
    private router: Router,
    private loginservice: LoginService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const stage = this.storageService.getData('stage');

    if (stage === 3) {
      return true;
    } else {

      this.router.navigateByUrl('/registration');
    }

  }
}
