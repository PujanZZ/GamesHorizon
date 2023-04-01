import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription, map } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { LogUserService } from './shared/services/log-user.service';
import { MatMenuTrigger } from '@angular/material/menu';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  isAuthenticated = false;
  isMenuOpen = false;
  private authSubscription: Subscription = new Subscription;
  
  //////////////
  //Auth Data///
  //////////////
  
  public error: any;
  id: string | undefined = '';
  subs1: Subscription = new Subscription;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logService: LogUserService,
  ) {

    const subs1 =this.afAuth.user.pipe(
      map(v => v?.uid)
    ).subscribe(
      uid => {
        this.id = uid;
      }
    )
  }

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
   
  }

  ngOnDestroy() {
  }

  ////////////////
  //login logout//
  ////////////////

  handleLogout() {
    this.authService.SignOut()
  }

  /////////////////////////
  //Some Extraa Functions//
  /////////////////////////

  toggleMenu(): void {
    if (this.trigger.menuOpen) {
      this.trigger.closeMenu();
    } else {
      this.trigger.openMenu();
    }
  }
  
  onMobile(): boolean {
    return window.innerWidth <= 600;
  }



}
