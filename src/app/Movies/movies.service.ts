import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiUrl: string = "https://api.themoviedb.org/3/movie/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1";

  constructor(private httpClient: HttpClient) { }

  getMovies(){
    return this.httpClient.get(this.apiUrl + 'movies')
  }

  getMovie(movieId){
    return this.httpClient.get(`${this.apiUrl + 'movies'}/${movieId}`)
  }

}
