import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list.component';
import { HomePageDetailsComponent } from '../home-page/home-page-details/home-page-details.component';

const routes: Routes = [
  { path: '', component: HomePageDetailsComponent },
  { path: ':name', component: HomePageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
