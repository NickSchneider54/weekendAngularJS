import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private apiUrl: string;

  constructor(private http: HttpClient) { }

  // calls the Popular Shows API 
  getShows(pageNum: number){
    this.apiUrl  =`https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.http.get(this.apiUrl);
  }

  // calls the Show Detials API based on the given Show ID
  getShow(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.http.get(this.apiUrl);
  }

  // calls the On TV API and gets the shows currently airing Shows
  getOnTV(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`
    return this.http.get(this.apiUrl);
  }

  // calls the TopRated API 
  getTopRated(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.http.get(this.apiUrl);
  }

  // calls the Trailers API based off the selected Show ID
  getTrailers(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.http.get(this.apiUrl);
  }

  // calls the Reviews API based off the selected Show ID
  getReviews(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.http.get(this.apiUrl);
  }

  // calls the Trending API based off the selected Show ID
  getCast(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9`;
    return this.http.get(this.apiUrl);
  }

  // calls the Recommended Shows API based off the selected Show ID
  getRecommendations(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.http.get(this.apiUrl);
  }

  getGenres(){
    this.apiUrl = 'https://api.themoviedb.org/3/genre/tv/list?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US';
    return this.http.get(this.apiUrl);
  }


}
