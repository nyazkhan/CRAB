import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent implements OnInit {

  // Data passed in by componentProps
  @Input() booking: object;
  bookingDetails: any = {};
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,


  ) {

    // this.bookingDetails = navParams.get('booking');
  }

  cancelInvitaion() {

  }
  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
