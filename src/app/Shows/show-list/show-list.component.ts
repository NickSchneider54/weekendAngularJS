import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Show } from '../show';
import * as moment from 'moment';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  public shows: Show[] = [];
  startPoint: number = 0;
  endPoint: number = 21;
  currentIndex: number = 1;

  constructor(private showsAPI: ShowsService, private router: Router) { }

  ngOnInit() {
    for(var i = 1; i <= 10; i++){      
      this.showsAPI.getShows(i).subscribe((result: any = [])=>{
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].first_air_date, 'YYYY-MM-DD').format("MMM D, YYYY");
          this.shows.push(new Show(result.results[i].id, result.results[i].poster_path,  result.results[i].vote_average, result.results[i].name, result.results[i].overview, releaseDate))
        }        
      })      
    }
    console.log(this.shows)
  }

  getArrayLength(length): number[]{
    return new Array(length/20);
  }

  updatePageIndex(pageIndex): void{
    this.startPoint = pageIndex * 21;
    this.endPoint = this.startPoint + 21;
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

  onSelect(show): void{
    this.router.navigate(['/show', show.id])
  }
}
