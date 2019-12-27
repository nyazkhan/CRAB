import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookPage } from './book.page';
import { CommanModule } from '../comman/comman.module';
import { BookedComponent } from '../comman/booked/booked.component';

const routes: Routes = [
  {
    path: '',
    component: BookPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommanModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookPage],
  entryComponents: [ BookedComponent],

})
export class BookPageModule {}
