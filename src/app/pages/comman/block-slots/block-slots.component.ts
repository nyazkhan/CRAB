import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-block-slots',
  templateUrl: './block-slots.component.html',
  styleUrls: ['./block-slots.component.scss'],
})
export class BlockSlotsComponent implements OnInit {
  currentDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  maxDate = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  slotTimeAndDate = {
    toDate: this.currentDate,

  };
  userId: any;
  slotsOfRestaurant: any = [];
  constructor(
    public modalController: ModalController,
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,

  ) {

    this.userId = this.storageService.getData('userId');
    this.slotsStatus();
  }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  slotsStatus() {
    this.slotsOfRestaurant = [];
    this.alertService.showLoader();
    this.loginservice.restaurantTimeSlot({
      restaurantId: this.userId,
      date: this.slotTimeAndDate.toDate.toString().slice(0, 10)
    }).subscribe((res) => {
      this.alertService.closeLoader();
      if (res.status === 200) {

        this.slotsOfRestaurant = res.data;
      }
    });
  }
  lockUnlock(id) {
    console.log(this.slotsOfRestaurant[id]);
    console.log(this.slotTimeAndDate.toDate.toString().slice(0, 10));
    this.alertService.showLoader();
    const TimeTo = this.slotsOfRestaurant[id].timeSlot.split('-');
    this.loginservice.blockUnBlockSlots({

      fromDate: this.slotTimeAndDate.toDate.toString().slice(0, 10),
      toDate: this.slotTimeAndDate.toDate.toString().slice(0, 10),
      fromTime: TimeTo[0],
      toTime: TimeTo[1],
      type: 1
    }).subscribe((res) => {
      this.alertService.closeLoader();
      this.slotsOfRestaurant[id].isDisable = !this.slotsOfRestaurant[id].isDisable;
    });
  }

}
