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
  bookingListCopy: any = [];


  pastBooking: any = [];
  upcomingBooking: any = [];
  constructor(
    public modalController: ModalController,
    // navParams: NavParams,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
  ) { }

  ngOnInit() {
    this.getBookingList();
  }



  getBookingList() {
    this.loginservice.getAllBooking().subscribe((res) => {
      if (res.status === 200) {
        this.bookingList = res.data;
        // this.bookingList[0].toDate = new Date(this.bookingList[0].toDate);
        // this.bookingList[0].onTime = this.bookingList[0].onTime.getTime();
        this.bookingListCopy = res.data;
      }
    });
  }

  getBookingListBystatus(statusId) {
    this.loginservice.getAllBookingByStatus(statusId).subscribe((res) => {
      if (res.status === 200) {
        this.bookingList = res.data;

      }
    });
  }




  filterBookingByCurrentDate(val) {
    // this.bookingListCopy = this.bookingList;
    if (val === 'cancel') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        console.log(el.status);

        return (el.status === 4) || (el.status === 2);
      });

    }
    if (val === 'next') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        return (el.status === 5);
      });

    }

    if (val === 'opend') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        return (el.status === 1);
      });

    }
    console.log(this.bookingList);

  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  async presentBookingModal(i) {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        booking: this.bookingList[i],
      }
    });
    return await modal.present();
  }


  filterResponse(val) {
    this.filterBy = val;
    if (this.filterBy === 'all') {
      this.bookingList = this.bookingListCopy;
      return;
    }

    this.filterBookingByCurrentDate(val);

  }



}
