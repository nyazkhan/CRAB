import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inviteddetails',
  templateUrl: './inviteddetails.component.html',
  styleUrls: ['./inviteddetails.component.scss'],
})
export class InviteddetailsComponent implements OnInit {

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
