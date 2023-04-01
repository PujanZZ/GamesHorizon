import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth-guard';
import { ErrorService } from './shared/services/error.service';
import { LogUserService } from './shared/services/log-user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-page/home-page-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { ReviewPageComponent } from './review-page/review-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home/:name', loadChildren: () => import('./home-page/home-page-routing.module').then(m => m.HomeRoutingModule) },
  { path: 'game', component: GameListComponent, canActivate: [AuthGuard] },
  { path: 'game/:name', loadChildren: () => import('./game-list/game-list-routing.module').then(m => m.GameRoutingModule) },
  { path: ':gameName/review', component: ReviewPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService,ErrorService,LogUserService],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  AppComponent,
  LoginFormComponent,
  HomePageComponent,
  RegisterFormComponent,
  DashboardComponent,
];