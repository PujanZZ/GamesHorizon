import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, map, pipe } from 'rxjs';
import { GameDetails } from 'src/app/shared/services/GameList';
import { MovieListService } from 'src/app/shared/services/movie.list.service';

@Component({
  selector: 'app-search-data-autocomplete',
  templateUrl: './search-data-autocomplete.component.html',
  styleUrls: ['./search-data-autocomplete.component.css']
})
export class SearchDataAutocompleteComponent {

  formControl = new FormControl('')
  subs: Subscription;
  gameResults: GameDetails[] = [];

  selectedResults: any[] = [];

  constructor(
    private movieService: MovieListService,
  ) {

    this.subs = new Subscription;

  }

  ngOnInit() {


    //////////////////////
    ///// Search//////////
    /////////////////////

    const subs1 = this.formControl.valueChanges.pipe(

      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.gameResults = [];
      this.movieService.getSearchResultAutoComplete(value).subscribe((v) => {

        const res = v.results;
        this.gameResults = [...res]

      });
    });

    ////////////////////
    ///storing in arr//
    ////////////////////

    const subs2 = this.formControl.valueChanges.subscribe((value) => {

      if (value && typeof value === 'object') {
        this.selectedResults.push(value);
        this.formControl.setValue('');
      }

      console.log(this.selectedResults)

    })


    this.subs.add(subs1)
    this.subs.add(subs2)

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ///////////////////////
  ////// extra //////////
  ///////////////////////

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

}
