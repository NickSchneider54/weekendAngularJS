import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { Show } from '../../Classes/Shows/show';
import * as moment from 'moment';
import { ShowsService } from '../../Services/Shows/shows.service';
import { SearchService } from 'src/app/Services/Search/search.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  // EventEmitter used to tell the app.component to enable the search when navigated to this page
  @Output() public enableSearch = new EventEmitter();
  heading: string = "Popular in TV Shows";
  shows: Show[] = []; // array to hold the Show objects created from the data returned by the API call 
  filteredShows: Show[]; // array of shows that pass the search/filter constraint
  startPoint: number = 0; // starting point of the pagination slice
  endPoint: number = 21; // ending point of the pagination slice
  currentIndex: number = 1; // the pageIndex of the page that the user id currently on
  pageSplit: number = 20; // number used in the denominator of the calculation for the number of pages
  private _filter: string;  // variable to hold the passed search/filter constraint  
  // getter for the _filter variable
  get filter(): string{
    return this._filter;
  }

  constructor(private showsAPI: ShowsService,private search: SearchService, private router: Router) { 
    // receives the search constraint from the app.component using the SearchService and calls the setFilter
    // function to begin the search/filter process
    this.search.getSearch().subscribe(searchItem =>{
      console.log(searchItem);
      if(searchItem){
        this.setfilter(searchItem);
      }
    });    
  }

  ngOnInit() {
    // calls the getShows function in the ShowsService 10 times to get the data from the first 10 pages
    for(var i = 1; i <= 10; i++){      
      this.showsAPI.getShows(i).subscribe((result: any = [])=>{
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].first_air_date, 'YYYY-MM-DD').format("MMM D, YYYY");
          this.shows.push(new Show(result.results[i].id, result.results[i].poster_path,  result.results[i].vote_average, result.results[i].name, result.results[i].overview, releaseDate))
        }        
      });      
    }
    // initially sets the filtered array to the shows array
    this.filteredShows = this.shows;
    // tells the app.component to enable the search bar
    this.enableSearch.emit(true);
  }

  // returns the calculated array for the number of pages for pagination
  getArrayLength(length: number): number[]{
    return new Array(Math.ceil(length/this.pageSplit));
  }

  // calculates the slice of the filteredMovies array and moves to the selected 'page' in pagination
  updatePage(pageIndex: number): void{
    this.startPoint = pageIndex * 21;
    console.log(this.startPoint);
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex + 1;
    this.goToTop();
  }

  // calculates the slice of the filteredMovies array and moves to the next 'page' in pagination
  nextPage(pageIndex: number): void{
    this.startPoint = pageIndex * 21;
    console.log(this.startPoint);
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex + 1;
    this.checkBounds(this.currentIndex);
    this.goToTop(); 
  }

  // calculates the slice of the filteredMovies array and moves to the previous 'page' in pagination
  prevPage(pageIndex: number): void{
    this.startPoint = this.startPoint - 21;
    console.log(this.startPoint)
    this.endPoint = this.startPoint + 21;
    this.currentIndex = pageIndex - 1;
    this.checkBounds(this.currentIndex);
    this.goToTop(); 
  }

  // checks the sent pageIndex, if it does not pass one of the two constraints (min page and max page) the pageIndex
  // is adjusted and sent to the updatePage function
  checkBounds(index: number): void{
    if(index >= (Math.ceil(this.filteredShows.length/this.pageSplit))){
      this.currentIndex = 9;
      this.updatePage(this.currentIndex);
    }   
    if(index < 1){
      this.currentIndex = 0;
      this.updatePage(this.currentIndex);
    }
  }

  // sets the search filter recieved from the app.component and sends it to the search function
  setfilter(value: string){
    this._filter = value;
    this.heading = `Show Titles Containing: ${value}`;
    this.filteredShows = this.filter ? this.searchShows(this.filter) : this.shows;
  }

  // function that holds the search/filter logic, returns an array filled with shows that meet the
  // filter constraint 
  searchShows(filterBy: string): Show[] {
    filterBy = filterBy.toLowerCase();    
    return this.shows.filter((show: Show) =>
      show.title.toLowerCase().indexOf(filterBy) !== -1
    );
  }

  // navigates to the top of the page
  goToTop(): void{
    var top = document.getElementById('page-title');
    top.scrollIntoView()
  }

  // builds the url for the chosen show and then navigates to that url using the router
  onSelect(show): void{
    this.router.navigate(['/show', show.id])
  }
}
