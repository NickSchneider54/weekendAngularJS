import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router'

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
        this.movies.push(new Movie(result.results[i].id, result.results[i].poster_path, result.results[i].title, result.results[i].release_date, result.results[i].overview, result.results[i].vote_average))
      }
      console.log(this.movies);
    })
  }

  onSelect(movie){
    this.router.navigate(['/movie', movie.id])
  }

}
