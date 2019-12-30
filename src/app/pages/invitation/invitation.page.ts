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
        this.invitaionList[0].toDate = new Date(this.invitaionList[0].toDate);
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

      this.invitaionListCopy = this.invitaionList;

    }
    if (this.filterBy === 'next') {

      this.filterInvitationByCurrentDate('next');
    }
    if (this.filterBy === 'past') {

      this.filterInvitationByCurrentDate('past');

    }
  }


  filterInvitationByCurrentDate(val) {
    this.invitaionListCopy = this.invitaionList;
    if (val === 'past') {
      this.pastInvitation = this.invitaionListCopy.filter((el) => {
        return el.date < new Date();
      });

    }
    if (val === 'next') {
      this.upcomingInvitation = this.invitaionListCopy.filter((el) => {
        return el.date >= new Date();
      });

    }
  }
}
