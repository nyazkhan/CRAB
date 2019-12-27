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

  constructor(
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  getListOfInvitaion() {
    this.loginservice.listOfInvitation({}).subscribe((res) => {
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

        // invitation: this.invitaionList[i],
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
