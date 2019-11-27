import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ShowsService } from '../../Services/Shows/shows.service';
import { CastMember } from 'src/app/Classes/Cast/cast-member';
import { Review } from 'src/app/Classes/Reviews/review';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showId: number; // the id of the selected show        
  headerImg: string; // the backdrop Image to be set to the header bg
  releaseDate: string; // variable to hold the formatted release date
  show: object;  // object to hold the returned show data
  reviews = []; // array to hold the show reviews
  topBilled: CastMember[] = []; // array to store topBilled cast
  trailers = []; // array to hold the show trailers
  officialTrailer: string; // varaibale to hold the trailer that is being shown
  videoUrl: SafeResourceUrl; // variable to hold the sanitized url of the chosen trailer

  // EventEmitter used to tell the app.component to disable the search bar
  @Output() public enableSearch = new EventEmitter(); 

  constructor(private showsAPI: ShowsService, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    // maps the url, finds and grabs the id
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.showId = id;
    
    // calls the getShow method in the ShowsService to and returns the appropriate results
    this.showsAPI.getShow(this.showId)
      .subscribe((result: any = []) =>{        
        this.show = result;
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.first_air_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
    });

    // calls the getTrailers method in the ShowsService to and returns the appropriate results
    this.showsAPI.getTrailers(this.showId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = result.results[i];
        }
        this.officialTrailer = result.results[0].key;
        // sanitizes the URL to bypass google security
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.officialTrailer}`);
    });

    // calls the getReviews method in the ShowsService to and returns the review API call data
    this.showsAPI.getReviews(this.showId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews.push(new Review(result.results[i].author, result.results[i].content));
        }
    }); 

    // calls the getCast method in the MoviesService to and returns the review API call data
    this.showsAPI.getCast(this.showId)    
      .subscribe((result: any = []) =>{
        for(var i = 0; i < 5; i++){
          this.topBilled.push(new CastMember(result.cast[i].profile_path, result.cast[i].name, result.cast[i].character));
        }
    });

    // tells the app.component that the seach bar should be disabled
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
