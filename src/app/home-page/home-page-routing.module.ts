import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageDetailsComponent } from './home-page-details/home-page-details.component';
import { ReviewPageComponent } from '../review-page/review-page.component';


const routes: Routes = [
  { path: '', component: HomePageDetailsComponent },
  { path: ':name', component: HomePageDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
