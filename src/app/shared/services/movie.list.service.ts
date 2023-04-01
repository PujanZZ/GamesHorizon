import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { environment } from 'src/environment'

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  private apiKey: string = environment.apiKey
  subs: Subscription;

  constructor(
    private http: HttpClient
  ) {

    this.subs = new Subscription;
   }
   
  getLatestData(): Observable<any> {
    const apiUrl = `https://api.rawg.io/api/games?dates=2022-01-01,2023-03-18&ordering=-added,-rating&key=${this.apiKey}`
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null);
      })
    )
  }

  getDetailsData(name: string): Observable<any> {
    const apiUrl = `https://api.rawg.io/api/games/${name}?key=${this.apiKey}`
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null);
      })
    )
  }

  getDlcData(name: string): Observable<any> {
    const apiUrl = `https://api.rawg.io/api/games/${name}/additions?key=${this.apiKey}`
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.log(error)
        return of(null);
      })
    )
  }

  // getSameSeriesData(name: string): Observable<any> {
  //   const apiUrl = `https://api.rawg.io/api/games/${name}/game-series?key=${this.apiKey}`
  //   return this.http.get(apiUrl).pipe(
  //     catchError(error => {
  //       console.log(error)
  //       return of(null);
  //     })
  //   )
  // }

  getDevGames(id: number): Observable<any> {
    const apiUrl = `https://api.rawg.io/api/games?developers=${id}&key=${this.apiKey}`
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.log(error)
        return of(null);
      })
    )
  }

  getSearchResult(search_vector: string | null,page: number): Observable<any> {
    const DEFAULT_PAGE = 1;
    const apiUrl = `https://api.rawg.io/api/games?key=${this.apiKey}&page=${page || DEFAULT_PAGE}&page_size=10&search=${search_vector}&ordering=-added`
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.log(error)
        return of(null);
      })
    )
  }

  getSteamGames(): Observable<any> {
    const apiUrl = `https://api.rawg.io/api/games?key=${this.apiKey}&page_size=20&platforms=4&ordering=-added`
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.log(error)
        return of(null)
      })
    )
  };

  ngAfterViewInit(){}

}
