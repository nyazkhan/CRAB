import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss'],
})
export class AfterLoginComponent implements OnInit {
  name: string;
  constructor(
    public modalController: ModalController,
    @Inject(Router) private router: Router,
    private storageService: StorageService,
    @Inject(AlertService) private alertService: AlertService,

  ) { }

  ngOnInit() { }

  goToMap() {
    if (this.name.length < 3) {
      this.alertService.showErrorAlert('Please Full Enter Name ');
      return;
    }
    this.storageService.storeData('NAME', this.name);
    this.dismiss();
    this.router.navigateByUrl('/map');

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
