import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './environment';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthService } from './shared/services/auth.service';
import { LogUserService } from './shared/services/log-user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieListService } from './shared/services/movie.list.service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HomePageDetailsComponent } from './home-page/home-page-details/home-page-details.component';
import { GameListComponent } from './game-list/game-list.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { SteamPanelComponent } from './steam-panel/steam-panel.component';
import { SearchDataAutocompleteComponent } from './home-page/search-data-autocomplete/search-data-autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DashboardComponent,
    HomePageDetailsComponent,
    GameListComponent,
    ReviewPageComponent,
    SteamPanelComponent,
    SearchDataAutocompleteComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule ,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    FontAwesomeModule,
    ScrollingModule,
    NgChartsModule,
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatAutocompleteModule,
    
  ],
  providers: [AuthService,LogUserService,MovieListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
