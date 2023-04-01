import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription, combineLatest, map, pipe, tap } from 'rxjs';
import { MovieListService } from '../shared/services/movie.list.service';
import { Game } from '../shared/services/GameList';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { faPlaystation } from '@fortawesome/free-brands-svg-icons';
import { faXbox } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  ////////////////////
  ///icons////////////
  /////////////////////
  steam = faSteam;
  playstation = faPlaystation;
  xbox = faXbox;


  /////////////////////
  /////////////////////


  id: string | undefined = ''
  error: any;
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  subs: Subscription;
  gameLatest: Game[] = [];

  constructor(
    private authService: AuthService,
    public route: Router,
    private afAuth: AngularFireAuth,
    public activatedRoute: ActivatedRoute,
    private movieService: MovieListService,
  ) {

    this.subs = new Subscription;
    const subs1 = this.afAuth.user.pipe(
      map(v => v?.uid)
    ).subscribe(
      uid => {
        this.id = uid;
      }
    )
  }

  ngOnInit() {

    ///////////////////////
    /// Latest Games Data//
    ///////////////////////

    const subs2 = this.movieService.getLatestData().pipe(
      map((res) => res.results),
      map((gameList: Game[]) => gameList)
    ).subscribe(res => {
      this.gameLatest = [...res]
    })
    this.subs.add(subs2)

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  public updateToDetailView(evt: MouseEvent,name: string){
    this.route.navigate((['/home',name]))
  }
  
  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

}

