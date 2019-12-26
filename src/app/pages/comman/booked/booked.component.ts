import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent implements OnInit {

  constructor(
    public modalController: ModalController,

  ) { }

  ngOnInit() {}
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
