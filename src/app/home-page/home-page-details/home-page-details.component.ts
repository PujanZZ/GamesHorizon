import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSteam, faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import { Subscription, combineLatest, forkJoin, from, map } from 'rxjs';
import { GameDetails } from 'src/app/shared/services/GameList';
import { MovieListService } from 'src/app/shared/services/movie.list.service';
import {  ChartData, ChartOptions } from 'chart.js';



@Component({
  selector: 'app-home-page-details',
  templateUrl: './home-page-details.component.html',
  styleUrls: ['./home-page-details.component.css']
})
export class HomePageDetailsComponent {

  subs: Subscription;
  gameDetails!: GameDetails;
  ratings!: GameDetails['ratings'];
  // ratings_percentage!: number[]
  // extra_games!: GameDetails[];
  dev_data!: GameDetails[];


  ////////////////////
  //////extra ////////
  ///////////////////
  showLineDiv = false;
  showRatingDiv = false;

  panelOpenState = false;
  steam = faSteam;
  playstation = faPlaystation;
  xbox = faXbox;
  isLoading = false;

  ///////////////////
  /// PIE CHART//////
  ///////////////////
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };
  public pieChartPlugins = [];
  public pieChartLegend = true;
  public ratings_title: string[] = [];
  public ratings_percentage: number[] = [];


  //////////////////////
  //////////////////////
  /////////////////////

  constructor(
    public router: ActivatedRoute,
    private movieService: MovieListService,
    private route: Router,
    private cd: ChangeDetectorRef,
  ){
    this.subs = new Subscription;
  }

  get slug(): string {
    return this.router.snapshot.params['name']
  }
  getRatingColor(title: string): string {
    switch (title.toLowerCase()) {
      case 'exceptional':
        return '#4CAF50'; // green
      case 'recommended':
        return '#FFC107'; // yellow
      case 'meh':
        return '#FF9800'; // orange
      case 'skip':
        return '#F44336'; // red
      default:
        return '#CCCCCC'; // gray
    }
  }
  
  getRatingPercent(percent: number): string {
    return `${percent}%`;
  }
  
  ngOnInit() {

    ///////////////////////
    /// Latest Details  ///
    ///////////////////////

    const subs1 = this.movieService.getDetailsData(this.slug).pipe(
      map((res: GameDetails) => res),  
    ).subscribe(gameRes => {
      this.gameDetails = gameRes

      //
      const plat = gameRes.ratings
      this.ratings = [...plat]
      
      const ratings_percentage = plat.map(a => a.percent)
      this.ratings_percentage = [...ratings_percentage]

      //pie
      const ratings_title = plat.map(a => a.title)
      this.ratings_title = [...ratings_title]

      this.pieChartData.labels = [...this.ratings_title];
      this.pieChartData.datasets[0].data = [...this.ratings_percentage];
      
      //DEVgames
      const devIds = this.gameDetails.developers.map(a => a.id);
      const subs3 = devIds.map(id => this.movieService.getDevGames(id).pipe(
          map(v => v.results),
          map((a: GameDetails[]) => a.filter(obj => obj.slug !== this.slug))
      ).subscribe(x => {

          this.dev_data = [...x]
      }))


      this.isLoading = true;

    })

    this.subs.add(subs1)

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  navigateToReviewForm(evt: MouseEvent) {
      this.route.navigate([`${this.slug}/review`]);
  }

  // events

  togglePieDiv() {
    this.showRatingDiv = !this.showRatingDiv;
  }
  toggleLineDiv() {
    this.showLineDiv = !this.showLineDiv;
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

}
