import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-add-blogger',
  templateUrl: './add-blogger.component.html',
  styleUrls: ['./add-blogger.component.scss'],
})
export class AddBloggerComponent implements OnInit {
  @Input() bloggerList: object;

  bloggerListCopy: any;
  bloggerAdded: any = [];
  searchBy = {

    name: '',
    searchType: 2

  };
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private loginservice: LoginService,


  ) {

    this.bloggerListCopy = navParams.get('bloggerList');
    this.getListOfBlogger();

  }


  AddBlogger(blogger) {

    this.bloggerAdded.push(blogger);
  }

  getListOfBlogger() {
    this.loginservice.getBloggerList(this.searchBy).subscribe((res) => {
      if (res.status === 200) {
        this.bloggerListCopy = res.data;
        console.log(res);

      }
    });
  }


  test(event) {
    console.log(event.target.value);
    this.searchBy.name = event.target.value;

    this.getListOfBlogger();
  }



  ngOnInit() { }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
