import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-block-slots',
  templateUrl: './block-slots.component.html',
  styleUrls: ['./block-slots.component.scss'],
})
export class BlockSlotsComponent implements OnInit {
  currentDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  maxDate = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  bookingDetails = {
    // id: null,
    persons: 1,
    toDate: this.currentDate,
    onTime: '15:00',
    to: null
  };
  constructor(
    public modalController: ModalController,

  ) { }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
