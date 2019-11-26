import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../Classes/Movies/movie';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from '../../Services/Movies/movies.service';

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
  trailers = []; // array to hold the movie trailers
  officialTrailer: string; // varaibale to hold the trailer that is being shown
  videoUrl: SafeResourceUrl; // variable to hold the sanitized url of the chosen trailer  
  startPoint: number = 0;
  endPoint: number = 1;
  slideIndex: number = 1;

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
        console.log(result)     
        this.movie = new Movie(this.movieId, result.backdrop_path, result.title, result.release_date, result.overview, result.vote_average, result.genres);
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.release_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
        console.log(this.headerImg)
        console.log(this.movie)
    });

    // calls the getTrailers method in the MoviesService to and returns the appropriate results
    this.movieAPI.getTrailers(this.movieId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${result.results[i].key}`);
        }   
        console.log(this.trailers)     
    });

    // calls the getReviews method in the MoviesService to and returns the review API call data
    this.movieAPI.getReviews(this.movieId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews[i] = result.results[i];
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

  prevReview(): void{
    this.startPoint = this.startPoint - 1;;
    this.endPoint = this.startPoint + 1;
    this.slideIndex -= 1;
    this.checkBounds(this.slideIndex);
  }

  nextReview(index: number): void{
    this.startPoint = index;
    this.endPoint = this.startPoint + 1;
    this.slideIndex += 1;
    this.checkBounds(this.slideIndex);
  }

  checkBounds(index: number): void{
    if(index > this.trailers.length){
      index = this.trailers.length - 1;
      this.resetSlide(index);
    }
    if(index <= 0){
      index = 0;
      this.resetSlide(index);
    }
  }

  resetSlide(index: number){
    this.startPoint = index * 1;
    this.endPoint = this.startPoint + 1;
  }

}
