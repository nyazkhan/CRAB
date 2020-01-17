import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InviteddetailsComponent } from '../comman/inviteddetails/inviteddetails.component';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {

  invitaionList: any = [];
  filterBy = 'all';
  invitaionListCopy: any = [];


  pastInvitation: any = [];
  upcomingInvitation: any = [];
  constructor(
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getInvitationList();
  }

  getInvitationList() {
    this.loginservice.getAllInvitaion().subscribe((res) => {
      if (res.status === 200) {
        this.invitaionList = res.data;
        this.invitaionListCopy = res.data;

        // this.invitaionList[0].toDate = new Date(this.invitaionList[0].toDate);
      }
    });
  }

  getInvitationListBystatus(statusId) {
    this.loginservice.getAllInvitaionByStatus(statusId).subscribe((res) => {
      if (res.status === 200) {
        this.invitaionList = res.data;
      }
    });
  }


  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  async presentInvitationModal(i) {
    const modal = await this.modalController.create({
      component: InviteddetailsComponent,
      componentProps: {

        invitation: this.invitaionList[i],
      }
    });
    return await modal.present();
  }


  filterResponse(val) {
    this.filterBy = val;
    if (this.filterBy === 'all') {

      this.invitaionList = this.invitaionListCopy;
      return;
    }


    this.filterInvitationByCurrentDate(val);


  }





  filterInvitationByCurrentDate(val) {
    if (val === 'cancel') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        console.log(el.status);

        return (el.status === 3) || (el.status === 17);
      });

    }
    if (val === 'next') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        return (el.status === 10);
      });

    }

    if (val === 'opend') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        return (el.status === 1);
      });

    }

    if (val === 'past') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {

        return (el.status === 16) || (el.status === 13);
      });

    }
    console.log(this.invitaionList);

  }


}
