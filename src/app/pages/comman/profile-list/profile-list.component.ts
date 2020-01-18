import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/service/storage.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  @Input() restaurantDetails: object;
  userDetailsCopy: any;
  dashBoardCount: any = {};
  dashBoardReviwCount: any = {};
  constructor(
    @Inject(Router) private router: Router,
    navParams: NavParams,
    private loginservice: LoginService,
    private storageService: StorageService,
    public modalController: ModalController,

  ) {
    this.userDetailsCopy = navParams.get('restaurantDetails');

  }

  ngOnInit() {
    this.getCount();
  }
  getCount() {
    this.loginservice.getDashboardCount({
      searchType: 5,
      status: 1
    }).subscribe((res) => {
      if (res.status === 200) {
        this.dashBoardCount = JSON.parse(res.data);
        console.log(this.dashBoardCount);

      }
    });
    this.loginservice.getDashboardCount({
      searchType: 5,
      status: 13
    }).subscribe((res) => {
      if (res.status === 200) {
        this.dashBoardReviwCount = JSON.parse(res.data);

      }
    });
  }
  navigateTo(val) {
    this.dismiss();
    this.router.navigateByUrl(val);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
  LogOut() {
    this.storageService.clearData();
    this.dismiss();
    this.router.navigateByUrl('/login');
  }
  // openParofileModel
}
