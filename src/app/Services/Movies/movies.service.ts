import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl: string;

  constructor(private httpClient: HttpClient) { }

  // calls the Movies API
  getMovies(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the Movie Detail API based on the given Movie ID
  getMovie(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the In Theaters API and gets the Movies currently playing in theaters
  getInTheaters(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the Top Rated Movies API and gets the currently Top Rated Movies
  getTopRated(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the Movie Trailers API and gets the trailers of the given Movie
  getTrailers(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the Movie Reviews API and gets the Reviews for the given Movie
  getReviews(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the Movie Cast API and gets the Cast Members from the given Movie
  getCast(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9`;
    return this.httpClient.get(this.apiUrl);
  }

  // calls the Movie Recommendations API and gets the Recommended Movies
  // based on the given Movie
  getRecomendations(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.httpClient.get(this.apiUrl);
  }

  getGenres(){
    this.apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.httpClient.get(this.apiUrl);
  }

}
