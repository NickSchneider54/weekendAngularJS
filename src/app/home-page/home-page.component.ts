import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router'
import { Show } from '../Shows/show';
import { Movie } from '../Movies/movie';
import { MoviesService } from '../Movies/movies.service';
import { ShowsService } from '../Shows/shows.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  headerImage: string;
  inTheaters: Movie[] = [];
  onTV = []
  topBilled = [];
  page: number = 1;

  constructor(private movieAPI: MoviesService, private showAPI: ShowsService, private router: Router) { }


  ngOnInit() {
    this.movieAPI.getMovies(this.page).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        var releaseDate = moment(result.results[i].release_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
        var backdrop = `https://image.tmdb.org/t/p/original${result.results[i].backdrop_path}`
        this.inTheaters.push(new Movie(result.results[i].id, backdrop, result.results[i].title, releaseDate, result.results[i].overview, result.results[i].vote_average));
      }
      console.log(this.inTheaters)
    });
    
    this.showAPI.getShows(this.page).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        this.onTV.push(new Show(result.results[i].id, result.results[i].backdrop_path, result.results[i].vote_average, result.results[i].name, result.results[i].overview, moment(result.results[i].first_air_date, 'YYYY-MM-DD').format('MM-DD-YYYY')));
      }
    });

  }  

  // getTopBilled(){
  //   for(var i = 0; i < this.inTheaters.length; i++){
  //     this.http.get(`https://api.themoviedb.org/3/movie/${this.inTheaters[i].id}/credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9`).subscribe((result: any = []) =>{
  //       console.log(result.results)  
  //     this.inTheaters[i].topBilled = result.results;
        
  //       console.log(this.inTheaters[i].topBilled)
  //     });
      
  //   }
  // }

  bgImg(image){
    return {background : `url(${image})`};
  }

  movieSelect(movie){
    this.router.navigate(['/movie', movie.id]);
  }

  showSelect(show){
    this.router.navigate(['/show', show.id]);
  }

}
