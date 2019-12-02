import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl: string;

  constructor(private httpClient: HttpClient) { }

  getMovies(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.httpClient.get(this.apiUrl);
  }

  getMovie(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.httpClient.get(this.apiUrl);
  }

  getInTheaters(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.httpClient.get(this.apiUrl);
  }

  getTopRated(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.httpClient.get(this.apiUrl);
  }

  getTrailers(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.httpClient.get(this.apiUrl);
  }

  getReviews(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.httpClient.get(this.apiUrl);
  }

  getCast(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9`;
    return this.httpClient.get(this.apiUrl);
  }

  getRecomendations(movieId: number){
    this.apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.httpClient.get(this.apiUrl);
  }

}
