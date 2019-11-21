import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private apiUrl: string;

  constructor(private http: HttpClient) { }

  getShows(pageNum){
    console.log(pageNum)
    this.apiUrl  =`https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${pageNum}`
    console.log(this.apiUrl)
    return this.http.get(this.apiUrl)
  }

  getShow(id){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`
    return this.http.get(this.apiUrl + 'shows')
  }

  getTrailers(id){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`
    return this.http.get(this.apiUrl + 'shows')
  }

  getReviews(id){
    this.apiUrl = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`
    return this.http.get(this.apiUrl + 'shows')
  }


}
