import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movies = [];

  constructor(private http: HttpClient) { }

  url = "https://api.themoviedb.org/3/movie/now_playing?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1";

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(result =>{
        console.log(result.results)
        for(var i = 0; i < result.results.length; i++){
          this.movies[i] = result.results[i];
        }
      });
     console.log(this.movies);    
  }

}
