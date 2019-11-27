import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../Classes/Movies/movie';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from '../../Services/Movies/movies.service';
import { Trailer } from 'src/app/Classes/Trailers/trailer';
import { CastMember } from 'src/app/Classes/Cast/cast-member';
import { Review } from 'src/app/Classes/Reviews/review';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number; // the id of the selected movie
  headerImg: string; // the backdrop Image to be set to the header bg
  releaseDate: string; // variable to hold the formatted release date
  movie: Movie;  // object to hold the returned movie data
  reviews = []; // array to hold the moviereviews
  topBilled: CastMember[] = []; // array to store topBilled cast
  trailers: Trailer[] = []; // array to hold the movie trailers
  officialTrailer: string; // varaibale to hold the trailer that is being shown
  videoUrl: SafeResourceUrl; // variable to hold the sanitized url of the chosen trailer  
  startPoint: number = 0; // variable to hold the starting point of the trailer slice
  endPoint: number = 1; // variable to hold the ending point of the trailer slice
  slideIndex: number = 0; // variable to hold the index of the current slide

  // EventEmitter used to tell the app.component to disable the search bar
  @Output() public enableSearch = new EventEmitter();

  constructor(private movieAPI: MoviesService, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }
 
  ngOnInit() {
    // maps the url, finds and grabs the id
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.movieId = id; 

    // calls the getMovie method in the MoviesService to and returns the appropriate results
    this.movieAPI.getMovie(this.movieId)
      .subscribe((result: any = []) =>{ 
        this.movie = new Movie(this.movieId, result.backdrop_path, result.title, result.release_date, result.overview, result.vote_average, result.genres);
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.release_date, 'YYYY-MM-DD').format("MMM DD, YYYY");        
    });

    // calls the getTrailers method in the MoviesService to and returns the appropriate results
    this.movieAPI.getTrailers(this.movieId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers.push(new Trailer(this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${result.results[i].key}`), result.results[i].name));
        }      
    });

    // calls the getReviews method in the MoviesService to and returns the review API call data
    this.movieAPI.getReviews(this.movieId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews.push(new Review(result.results[i].author, result.results[i].content));
        }
    });

    // calls the getCast method in the MoviesService to and returns the review API call data
    this.movieAPI.getCast(this.movieId)    
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
    var landing = document.getElementById('header');
    landing.scrollIntoView();
  }

  // returns the background image to be set for the header
  bgImg(){
    return {background : `url(${this.headerImg})`};
  }

   // moces the carousel slide to the previous trailer in the array
  prevTrailer(): void{
    this.startPoint = this.startPoint - 1;;
    this.endPoint = this.startPoint + 1;
    this.slideIndex -= 1;
    this.checkBounds(this.slideIndex);
  }

  // moces the carousel slide to the next trailer in the array
  nextTrailer(index: number): void{
    this.startPoint = index;
    this.endPoint = this.startPoint + 1;
    this.slideIndex = index;
    this.checkBounds(this.slideIndex);
  }

  // a check for the carousel slideIndex
  checkBounds(index: number): void{
    if(index > this.trailers.length - 1){
      this.slideIndex = 0;
      this.resetSlide(this.slideIndex);
    }
    if(index < 0){
      this.slideIndex = (this.trailers.length - 1);
      this.resetSlide(this.slideIndex);
    }
  }

  // sets the the current slide to the first or last Trailer in the
  // trailers array based on what index is sent from the bounds check
  resetSlide(index: number){
    console.log(index)
    this.startPoint = index;
    this.endPoint = this.startPoint + 1;
    this.slideIndex = index;
    console.log(this.slideIndex)
  }

}
