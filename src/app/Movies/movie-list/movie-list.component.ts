import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router'
import * as moment from 'moment';


@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[] = [];
  startPoint: number = 0;
  endPoint: number = 21;
  currentIndex: number = 1;

  constructor(private movieAPI: MoviesService, private router: Router) { }

  ngOnInit() {
    for(var i = 1; i <= 10; i++){
      this.movieAPI.getMovies(i).subscribe((result: any = [])=>{
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].release_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
          this.movies.push(new Movie(result.results[i].id, result.results[i].poster_path, result.results[i].title, releaseDate, result.results[i].overview, result.results[i].vote_average))
        }
      })
    }
    console.log(this.movies);
  }

  getArrayLength(length){
    return new Array(length/20);
  }

  updatePageIndex(pageIndex){
    this.startPoint = pageIndex * 21;
    console.log(this.startPoint);
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex + 1;    
  }

  nextPage(pageIndex){
    this.startPoint = pageIndex * 21;
    console.log(this.startPoint);
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex + 1;
    this.checkBounds(this.currentIndex);
  }

  prevPage(pageIndex){
    this.startPoint = this.startPoint - 21;
    console.log(this.startPoint)
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex - 1;
    this.checkBounds(this.currentIndex);
  }

  checkBounds(index){
    if(index >= 10){
      this.currentIndex = 9;
      this.updatePageIndex(this.currentIndex);
    }   
    if(index < 1){
      this.currentIndex = 0;
      this.updatePageIndex(this.currentIndex);
    }
  }

  onSelect(movie){
    this.router.navigate(['/movie', movie.id]);
  }

}
