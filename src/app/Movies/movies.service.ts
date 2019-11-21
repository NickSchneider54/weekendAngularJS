import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl: string;

  constructor(private httpClient: HttpClient) { }

  getMovies(pageNum){
    console.log(pageNum)
    this.apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`
    console.log(this.apiUrl)
    return this.httpClient.get(this.apiUrl)
  }

  getMovie(movieId){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`
    return this.httpClient.get(this.apiUrl + 'movies')
  }

  getTrailers(movieId){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`
    return this.httpClient.get(this.apiUrl + 'movies')
  }

  getReviews(movieId){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`
    return this.httpClient.get(this.apiUrl + 'movies')
  }

}
