import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ShowsService } from '../../../Services/Shows/shows.service';
import { CastMember } from 'src/app/Classes/Cast/cast-member';
import { Review } from 'src/app/Classes/Reviews/review';
import { Show } from 'src/app/Classes/Shows/show';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showId: number; // the id of the selected show        
  headerImg: string; // the backdrop Image to be set to the header bg
  releaseDate: string; // variable to hold the formatted release date
  show: Show;  // object to hold the returned show data
  reviews = []; // array to hold the show reviews
  topBilled: CastMember[] = []; // array to store topBilled cast
  recommendations: Show[] = []; // array to store recommended titles
  trailers = []; // array to hold the show trailers
  officialTrailer: string; // varaibale to hold the trailer that is being shown
  videoUrl: SafeResourceUrl; // variable to hold the sanitized url of the chosen trailer

  // EventEmitter used to tell the app.component to disable the search bar
  @Output() public enableSearch = new EventEmitter(); 
  
  constructor(private showsAPI: ShowsService, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer) { 
    
    // tells the Router not to use the last URL navigated to on reload
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // tricks the Router into believing it's last link wasn't previously loaded
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /* "tells" the router that the last routerLink visited was never 
           actually navigated to */
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    // maps the url, finds and grabs the id
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.showId = id;
    
    // calls the getShow function in the ShowsService and returns the appropriate results
    this.showsAPI.getShow(this.showId)
      .subscribe((result: any = []) =>{        
        this.show = new Show(this.showId, result.backfrop_path, result.vote_average, result.name, result.overview, result.first_air_date, result.genre_ids);
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.first_air_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
    });

    // calls the getTrailers function in the ShowsService and returns the appropriate results
    this.showsAPI.getTrailers(this.showId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = result.results[i];
        }
        this.officialTrailer = result.results[0].key;
        // sanitizes the URL to bypass google security
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.officialTrailer}`);
    });

    // calls the getReviews function in the ShowsService and returns the review API call data
    this.showsAPI.getReviews(this.showId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews.push(new Review(result.results[i].author, result.results[i].content));
        }
    }); 

    // calls the getCast function in the ShowsService and returns the cast API call data
    this.showsAPI.getCast(this.showId)    
      .subscribe((result: any = []) =>{
        for(var i = 0; i < 5; i++){
          this.topBilled.push(new CastMember(result.cast[i].id, result.cast[i].profile_path, result.cast[i].name, result.cast[i].character));
        }
    });

    // calls the getRecommendations function in the ShowsService and returns the recommended API call data
    this.showsAPI.getRecommendations(this.showId)
      .subscribe((result: any = []) =>{
        console.log(result.results)
        for(var i = 0; i < 4; i++){
          this.recommendations.push(new Show(result.results[i].id, result.results[i].backdrop_path, result.results[i].vote_average, result.results[i].name, result.results[i].overview, result.results[i].release_date, result.results[i].genre_ids));
        }
    });

    // tells the app.component that the search bar should be disabled
    this.enableSearch.emit(false);
    // tells the browser where to go on load
    this.goToLanding();
  }

  // sets the landing for the page to the page header and then to scroll to it
  goToLanding(){
    var landing = document.getElementById('show-header');
    landing.scrollIntoView();
  }

  // sets the background image of the header
  bgImg(){
    return {background : `url(${this.headerImg})`};
  }

}
