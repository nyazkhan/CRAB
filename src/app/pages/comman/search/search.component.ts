import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { BloggerDetailsComponent } from '../blogger-details/blogger-details.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // Data passed in by componentProps
  @Input() bloggerList: object;
  @Input() position: object;

  restaurantListCopy: any;
  constructor(
    navParams: NavParams,
    public modalCtrl: ModalController,
    private loginservice: LoginService,
    private router: Router,


  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('bloggerList'));
    this.restaurantListCopy = navParams.get('bloggerList');
  }
  getListOfBlogger() {
    this.loginservice.getBloggerList({
      name: '',
      searchType: 2
    }).subscribe((res) => {
      if (res.status === 200) {
        this.restaurantListCopy = JSON.parse(JSON.stringify(res.data));
        console.log(res);

      }
    });
  }
  test(event) {
    console.log(event.target.value);
    this.getListOfBlogger();
  }
  gotToRestaurantDetailsPage(mobile) {
    this.dismiss();
    this.presentBloggerDetailsModal(mobile);
    // this.router.navigate(['/dashboard/restaurant', mobile]);
  }

  async presentBloggerDetailsModal(mobile) {
    const modal = await this.modalCtrl.create({
      component: BloggerDetailsComponent,
      componentProps: {

        mobileNo: mobile,
      }
    });
    return await modal.present();
  }


  ngOnInit() { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
