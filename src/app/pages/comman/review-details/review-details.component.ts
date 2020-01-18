import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss'],
})
export class ReviewDetailsComponent implements OnInit {
  idOfReview: any = {};
  @Input() reviewId: object;
  reviewDetail: any = {};
  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
  ) {

    this.idOfReview = navParams.get('reviewId');
    console.log(this.reviewDetail);
    if (this.idOfReview.id) {

      this.getReviewById();
    } else {
      this.goBack();
    }
  }

  ngOnInit() { }



  getReviewById() {
    this.loginservice.getReviewById(this.idOfReview.id).subscribe((res) => {
      console.log();
      if (res.status === 200) {
        this.reviewDetail = res.data;


      }
    });
  }


  goBack() {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });

  }
}
