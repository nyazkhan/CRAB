import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-app-intro',
  templateUrl: './app-intro.component.html',
  styleUrls: ['./app-intro.component.scss'],
})
export class AppIntroComponent implements OnInit {
  slidesOpts = {
    initialSlide: 1,
    speed: 400

  };
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(
    private router: Router,
    @Inject(Storage)  private storage: Storage
  ) {


  }
  next() {
    this.slides.slideNext();
  }


  ngOnInit() { }

  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/auth/login');
    // localStorage.setItem(tutorialComplete: true);
  }

}
