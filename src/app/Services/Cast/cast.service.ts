import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  private apiUrl: string; // variable to hold the API URL needed

  constructor(private http: HttpClient) { }  

  getBio(id:number):Observable<any>{
    this.apiUrl = `https://api.themoviedb.org/3/person/${id}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`;
    return this.http.get(this.apiUrl);
  }

  getCredits(id:number):Observable<any>{
    this.apiUrl = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`
    return this.http.get(this.apiUrl);
  }
}
