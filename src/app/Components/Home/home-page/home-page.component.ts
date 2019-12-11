import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router'
import { Show } from '../../../Classes/Shows/show';
import { Movie } from '../../../Classes/Movies/movie';
import { MoviesService } from '../../../Services/Movies/movies.service';
import { ShowsService } from '../../../Services/Shows/shows.service';
import { TrendingService } from '../../../Services/Trending/trending.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  inTheaters: Movie[] = []; // array to hold the shows currently in theaters
  onTV: Show[] = [] // array to hold the shows currently on TV
  topRatedShows: Show[] = []; // array to hold the topRated shows
  topRatedMovies: Movie[] = []; // array to hold the topRated movies
  trending: Object[] = []; // array of objects to hold the titles trending in both movies and shows
  page: number = 1; // variable to hold the page wanted from the API call

  // EventEmitter used to tell the app.component to disable the search bar
  @Output() public enableSearch = new EventEmitter();

  constructor(private movieAPI: MoviesService, private showAPI: ShowsService, private trendingAPI: TrendingService, private router: Router) { }

  ngOnInit() {
    // calls the getInTheaters method in the MoviesService and returns the appropriate results
    this.movieAPI.getInTheaters(this.page).subscribe((result: any = []) =>{
      for(var i = 0; i < 4; i++){
        var releaseDate = moment(result.results[i].release_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
        var backdrop = `https://image.tmdb.org/t/p/original${result.results[i].backdrop_path}`
        this.inTheaters.push(new Movie(result.results[i].id, backdrop, result.results[i].title, releaseDate, result.results[i].overview, result.results[i].vote_average, result.results[i].genre_ids));
      }
    });
    // calls the getOnTV method in the ShowsService and returns the appropriate results
    this.showAPI.getOnTV(this.page).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        this.onTV.push(new Show(result.results[i].id, result.results[i].backdrop_path, result.results[i].vote_average, result.results[i].name, result.results[i].overview, moment(result.results[i].first_air_date, 'YYYY-MM-DD').format('MM-DD-YYYY'), result.results[i].genre_ids));
      }
    });
    // calls the getTopRated method in the MoviesService and returns the appropriate results
    this.movieAPI.getTopRated(this.page).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        this.topRatedMovies.push(new Movie(result.results[i].id, `https://image.tmdb.org/t/p/original${result.results[i].poster_path}`, result.results[i].title, result.results[i].release_date, result.results[i].overview, result.results[i].vote_average, result.results[i].genre_ids));
      }
    });
    // calls the getTopRated method in the ShowsService and returns the appropriate results
    this.showAPI.getTopRated(this.page).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        this.topRatedShows.push(new Show(result.results[i].id, result.results[i].backdrop_path, result.results[i].vote_average, result.results[i].name, result.results[i].overview, result.results[i].first_air_date, result.results[i].genre_ids));
      }
    });
    // calls the getTrending method in the TrendingService and returns the appropriate results which 
    // are then checked for mediaTypes and an appropriate is created and pushed to the trending array
    this.trendingAPI.getTrending().subscribe((result: any = []) =>{
      for(var i = 0; i < 4; i++){        
        if(result.results[i].media_type == "movie"){
          this.trending.push(new Movie(result.results[i].id, `https://image.tmdb.org/t/p/original${result.results[i].poster_path}`, result.results[i].title, result.results[i].release_date, result.results[i].overview, result.results[i].vote_average, result.results[i].genre_ids));
        }
        else if(result.results[i].media_type == "tv"){
          this.trending.push(new Show(result.results[i].id, result.results[i].poster_path, result.results[i].vote_average, result.results[i].name, result.results[i].overview, result.results[i].first_air_date, result.results[i].genre_ids));
        }        
      }
    });
    // lets the app.component know that the search bar should be disabled
    this.enableSearch.emit(0);
  }  

  // returns the background image to be set for the card
  bgImg(image: string): object{
    return {background : `url(${image})`};
  }

  // checks the object type of clicked title and then sends it to the proper
  // function to generate the proper URL
  checkMediaType(title: Object): void{
    if(title instanceof Movie){
      this.movieSelect(title);
    }
    else if(title instanceof Show){
      this.showSelect(title);
    }
  }

  // generates a URL based on the given movieID and navigates to that 'page'
  movieSelect(movie: Movie): void{
    this.router.navigate(['/movie', movie.id]);
  }

  // generates a URL based on the given showID and navigates to that 'page'
  showSelect(show: Show): void{
    this.router.navigate(['/show', show.id]);
  }

}
