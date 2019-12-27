import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookedComponent } from '../comman/booked/booked.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  filterBy = 'all';
  bookingList: any = [];
  constructor(
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }



  getListOfBooking() {
    this.loginservice.listOfBooking({}).subscribe((res) => {
      if (res.status === 200) {
        this.bookingList = res.data;
      }
    });
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  async presentBookingModal(i) {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        // restaurantDetails: this.bookingList,
      }
    });
    return await modal.present();
  }


  filterResponse(val) {
    this.filterBy = val;
    if (this.filterBy === 'all') {


    }
    if (this.filterBy === 'next') {


    }
    if (this.filterBy === 'past') {


    }
  }


}
