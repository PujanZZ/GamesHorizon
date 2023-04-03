import { Component } from '@angular/core';
import { MovieListService } from '../shared/services/movie.list.service';
import { Subscription, map } from 'rxjs';
import { GameDetails } from '../shared/services/GameList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steam-panel',
  templateUrl: './steam-panel.component.html',
  styleUrls: ['./steam-panel.component.css']
})
export class SteamPanelComponent {

  subs: Subscription;
  steamGames!: GameDetails[];
  cardOpen: any;

  constructor(
    private movieService: MovieListService,
    private route: Router,
  ) {

    this.subs = new Subscription;
  }

  ngOnInit() {

    const subs1 = this.movieService.getSteamGames().pipe(
      map(v => v.results),
      map((a: GameDetails[]) => a)
    ).subscribe((res) => {
      this.steamGames = [...res]
      console.log(this.steamGames)
    })

    this.subs.add(subs1);

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  ////////////////////////
  ///// extra functions//
  ///////////////////////

  public updateToDetailView(evt: MouseEvent,name: string){
    this.route.navigate((['/home',name]))
  }

  onCardClick(index: number) {
    this.cardOpen = this.steamGames[index];
  }

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

}
