import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inviteddetails',
  templateUrl: './inviteddetails.component.html',
  styleUrls: ['./inviteddetails.component.scss'],
})
export class InviteddetailsComponent implements OnInit {

  // Data passed in by componentProps
  @Input() invitation: object;
  invitationDetails: any = {};
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,
    private router: Router,


  ) {

    this.invitationDetails = navParams.get('invitation');
  }

  getInvitaionDetail() {
    this.loginservice.getInvitaionDetails({}).subscribe((res) => {
      if (res === 200) {

      }
    });
  }

  ngOnInit() { }

  cancelInvitaion() {

  }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
