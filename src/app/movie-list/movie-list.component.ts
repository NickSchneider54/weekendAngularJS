import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MoviesApiService } from '../movies-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any = [];

  constructor(private moviesApi: MoviesApiService) { }

  ngOnInit() {
    return this.moviesApi.getMovies()
      .subscribe((data: any[]) => this.movies = data);
      console.log(this.movies)
  }

}
