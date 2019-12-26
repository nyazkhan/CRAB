import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-add-blogger',
  templateUrl: './add-blogger.component.html',
  styleUrls: ['./add-blogger.component.scss'],
})
export class AddBloggerComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
  ) {


  }

  ngOnInit() { }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
