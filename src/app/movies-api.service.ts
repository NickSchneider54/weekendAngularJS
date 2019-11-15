import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from './movie.model';

@Injectable({
    providedIn: 'root'
  })
  export class MoviesApiService {
    apiURL = 'https://api.themoviedb.org/3/movie/latest?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US';
  
    constructor(private httpClient: HttpClient) {}

    getMovies(): Observable<Movie[]>{
      return this.httpClient.get<Movie[]>(this.apiURL + "/movie")
    }
  }