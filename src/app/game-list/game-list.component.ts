import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { MovieListService } from '../shared/services/movie.list.service';
import { GameDetails, Genre } from '../shared/services/GameList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

subs: Subscription;
spinner!: boolean;
searching!: boolean;
currentPage = 0;

totalPages!: number

searchRes: GameDetails[] = [];

searchBar = new FormControl();

get searchValue() {
  return this.searchBar.value
}

get searchDisabled() {
  return !this.searchBar.dirty || this.searchBar.invalid
}

constructor(
  private movieService: MovieListService,
  private route: Router,
){
  this.subs = new Subscription;
}

ngOnInit() {

    ///////////////////////
    ///Search Vector//////
    /////////////////////// 
}

ngOnDestroy() {
  this.subs.unsubscribe()
}

onPageChange() {
  const query = this.searchBar.value;
  if (query && query.length > 0) {
    this.spinner = true;
    this.movieService.getSearchResult(this.searchBar.value, this.currentPage + 1).subscribe((v)=> {

      const totalResults = v.count;
      const pageSize = v.results.length;
      const totalPages = Math.ceil(totalResults / pageSize);
      this.totalPages = totalPages

      const search_results: GameDetails[] = v.results
      this.searchRes = [...search_results]

      this.spinner = false;
      this.searching = false;
      this.searchBar.reset(),

      (error: any) => {
        console.log(error);
      }
  })
  }
}






public updateToDetailView(evt: MouseEvent,name: string){
  this.route.navigate((['/game',name]))
}

onMobile(): boolean {
  return window.innerWidth <= 700;
}
}


