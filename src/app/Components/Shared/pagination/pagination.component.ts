import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() filtered: Object[]; // array to hold the Movies/Shows
  @Input() startPoint: number; // starting point of the page slice
  @Input() endPoint: number; // ending point of the page slice
  @Input() currentIndex: number; // current pageIndex the user is on

  // emits the updated starting point of the page slice
  @Output() public updateStartPoint: EventEmitter<number> = new EventEmitter();

  // emits the updated endinging point of the page slice
  @Output() public updateEndPoint: EventEmitter<number> = new EventEmitter();

  // emits the updated pageIndex that the user will be on
  @Output() public updatePageIndex: EventEmitter<number> = new EventEmitter();
  pageSplit: number = 20; // number used in the denominator of the calculation for the number of pages

  constructor() { }

  ngOnInit() { }

   // returns the calculated array for the number of pages for pagination
   getArrayLength(length: number){
    return new Array(Math.ceil(length/this.pageSplit));
  }

  // calculates the slice of the filteredMovies array and moves to the selected 'page' in pagination
  updatePage(pageIndex: number): void{
    this.startPoint = pageIndex * 21;    
    this.endPoint = this.startPoint + 21;    
    this.currentIndex = pageIndex + 1;
    this.updateStartPoint.emit(this.startPoint);
    this.updateEndPoint.emit(this.endPoint);
    this.updatePageIndex.emit(this.currentIndex);
    this.goToTop();    
  }

  // calculates the slice of the filteredMovies array and moves to the next 'page' in pagination
  nextPage(pageIndex: number): void{
    this.startPoint = pageIndex * 21;
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex + 1;
    this.checkBounds(this.currentIndex);
    this.goToTop(); 
  }

  // calculates the slice of the filteredMovies array and moves to the previous 'page' in pagination
  prevPage(pageIndex: number): void{
    this.startPoint = this.startPoint - 21;
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex - 1;
    this.checkBounds(this.currentIndex);
    this.goToTop(); 
  }

  // checks the sent pageIndex, if it does not pass one of the two constraints (min page and max page) the pageIndex
  // is adjusted and sent to the updatePage function
  checkBounds(index: number): void{
    if(index >= (Math.ceil(this.filtered.length/this.pageSplit))){
      this.currentIndex = 9;
      this.updatePage(this.currentIndex);
    }       
    if(index < 1){
      this.currentIndex = 0;
      this.updatePage(this.currentIndex);
    }
    // if both constraints are met the pagination data is emitted
    else if(index >= 1 && index < (Math.ceil(this.filtered.length/this.pageSplit))){
      this.updateStartPoint.emit(this.startPoint);
      this.updateEndPoint.emit(this.endPoint);
      this.updatePageIndex.emit(this.currentIndex);
    }
  }

  // navigates to the top of the page
  goToTop(): void{
    var top = document.getElementById('page-title');
    top.scrollIntoView()
  }

}
