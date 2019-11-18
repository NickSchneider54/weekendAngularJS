import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  apiUrl: string = "https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1";

  constructor(private http: HttpClient) { }

  getShows(){
    return this.http.get(this.apiUrl + 'shows');
  }

  getShow(id){
    
  }

}
