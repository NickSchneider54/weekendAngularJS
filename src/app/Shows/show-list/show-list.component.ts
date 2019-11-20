import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Show } from '../show';
import * as moment from 'moment';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  public shows = [];
  startPoint = 0;
  endPoint = 21;

  constructor(private http: HttpClient, private router: Router) { }

  url = "https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1";

  ngOnInit() {
    for(var i = 1; i <= 10; i++){
      this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=${i}`).subscribe((result: any = [])=>{
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].first_air_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
          this.shows.push(new Show(result.results[i].id, result.results[i].poster_path,  result.results[i].vote_average, result.results[i].name, result.results[i].overview, releaseDate))
        }
        console.log(this.shows);
      })
    }
  }

  getArrayLength(length){
    return new Array(length/20);
  }

  updatePageIndex(pageIndex){
    this.startPoint = pageIndex * 21;
    this.endPoint = this.startPoint + 21;
  }

  onSelect(show){
    this.router.navigate(['/show', show.id])
  }
}
