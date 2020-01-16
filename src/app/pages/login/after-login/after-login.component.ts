import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['../login.page.scss'],
})
export class AfterLoginComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    @Inject(Router) private router: Router,

  ) { }

  ngOnInit() { }

  goToMap() {
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
