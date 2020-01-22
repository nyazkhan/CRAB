import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppIntroComponent } from './app-intro/app-intro.component';
import { IntroGuard } from './guard/intro.guard';
import { LoginGuard } from './guard/login.guard';
import { MapGuard } from './guard/map.guard';
import { RegistrationGuard } from './guard/registration.guard';
import { TestingComponent } from './pages/testing/testing.component';
import { DashboardGuard } from './guard/dashboard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'intro', component: AppIntroComponent, canActivate: [IntroGuard] },
  // { path: 'test', component: TestingComponent },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule', canActivate: [LoginGuard] },
  // tslint:disable-next-line: max-line-length
  {
    path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule',
    canActivate: [RegistrationGuard]
  },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
  canActivate: [DashboardGuard]
},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule', canActivate: [MapGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'invitation', loadChildren: './pages/invitation/invitation.module#InvitationPageModule' },
  { path: 'book', loadChildren: './pages/book/book.module#BookPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
