import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private apiUrl: string;

  constructor(private http: HttpClient) { }

  getShows(pageNum: number){
    this.apiUrl  =`https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.http.get(this.apiUrl);
  }

  getShow(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.http.get(this.apiUrl);
  }

  getOnTV(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`
    return this.http.get(this.apiUrl);
  }

  getTopRated(pageNum: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`;
    return this.http.get(this.apiUrl);
  }

  getTrailers(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.http.get(this.apiUrl);
  }

  getReviews(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`;
    return this.http.get(this.apiUrl);
  }

  getCast(id: number){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9`;
    return this.http.get(this.apiUrl);
  }


}
