import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { InTheater } from '../Movies/in-theater';
import { Router } from '@angular/router'
import { Show } from '../Shows/show';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  headerImage: string;
  inTheaters = [];
  onTV = []
  topBilled = [];

  constructor(private http: HttpClient, private router: Router) { }

  private movieUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1"
  private tvUrl = "https://api.themoviedb.org/3/tv/on_the_air?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1";

  ngOnInit() {
    this.http.get(this.movieUrl).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        this.inTheaters.push(new InTheater(result.results[i].id, result.results[i].title, result.results[i].backdrop_path, moment(result.results[i].release_date, 'YYYY-MM-DD').format('MM-DD-YYYY')));
      }
      console.log(this.inTheaters)
    });
    
    this.http.get(this.tvUrl).subscribe((result: any = []) =>{
      for(var i = 0; i < 3; i++){
        this.onTV.push(new Show(result.results[i].id, result.results[i].backdrop_path, result.results[i].vote_average, result.results[i].name, result.results[i].overview, moment(result.results[i].first_air_date, 'YYYY-MM-DD').format('MM-DD-YYYY')));
      }
    });

  }  

  getTopBilled(){
    for(var i = 0; i < this.inTheaters.length; i++){
      this.http.get(`https://api.themoviedb.org/3/movie/${this.inTheaters[i].id}/credits?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9`).subscribe((result: any = []) =>{
        console.log(result.results)  
      this.inTheaters[i].topBilled = result.results;
        
        console.log(this.inTheaters[i].topBilled)
      });
      
    }
  }

  bgImg(image){
    return {background : `url(${image})`};
  }

  movieSelect(movie){
    this.router.navigate(['/movie', movie.id]);
  }

  showSelect(show){
    this.router.navigate(['/show', show.id]);
  }

}
