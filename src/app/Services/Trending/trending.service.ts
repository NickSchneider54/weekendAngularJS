import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  private apiUrl: string = "https://api.themoviedb.org/3/trending/all/day?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9";

  constructor(private http: HttpClient) { }

  getTrending(){
    return this.http.get(this.apiUrl);
  }

}
