import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router'
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  startPoint = 0;
  endPoint = 21;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    for(var i = 1; i <= 10; i++){
      this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${i}`).subscribe((result: any = [])=>{
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].release_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
          this.movies.push(new Movie(result.results[i].id, result.results[i].poster_path, result.results[i].title, releaseDate, result.results[i].overview, result.results[i].vote_average))
        }
        console.log(this.movies);
      })
    }
  }

  getArrayLength(length){
    return new Array(length/20);
  }

  updatePageIndex(pageIndex){
    this.startPoint = pageIndex * 21;
    this.endPoint = this.startPoint + 21;
  }

  onSelect(movie){
    this.router.navigate(['/movie', movie.id]);
  }

}
