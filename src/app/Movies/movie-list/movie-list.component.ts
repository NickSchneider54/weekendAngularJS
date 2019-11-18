import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router'
import * as moment from 'moment';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe((result: any = [])=>{
      for(var i = 0; i < result.results.length; i++){
        var releaseDate = moment(result.results[i].release_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
        this.movies.push(new Movie(result.results[i].id, result.results[i].poster_path, result.results[i].title, releaseDate, result.results[i].overview, result.results[i].vote_average))
      }
      console.log(this.movies);
    })
  }

  onSelect(movie){
    this.router.navigate(['/movie', movie.id]);
  }

}
