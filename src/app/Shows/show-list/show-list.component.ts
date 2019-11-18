import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  public shows = [];
  public aryShows: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  url = "https://api.themoviedb.org/3/tv/popular?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1";

  ngOnInit() {
    this.http.get(this.url)
    .subscribe((result: any = []) =>{
      console.log(result)
      for(var i = 0; i < result.results.length; i++){
        this.shows[i] = result.results[i];
      }
    });
   console.log(this.shows); 
  }

  onSelect(show){
    this.router.navigate(['/show', show.id])
  }
}
