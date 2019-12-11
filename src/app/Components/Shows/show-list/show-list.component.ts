import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { Show } from '../../../Classes/Shows/show';
import * as moment from 'moment';
import { ShowsService } from '../../../Services/Shows/shows.service';
import { SearchService } from 'src/app/Services/Search/search.service';
import { Genre } from 'src/app/Classes/Genres/genre';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  // EventEmitter used to tell the app.component to enable the search when navigated to this page
  @Output() public enableSearch = new EventEmitter();
  heading: string = "Popular TV Shows"; // Page title
  shows: Show[] = []; // array to hold the Show objects created from the data returned by the API call 
  genreFiltered: Show[]; // array to hold the movies filtered by the selected Genre
  filtered: Show[]; // array of shows that pass the search/filter constraint
  startPoint: number = 0; // starting point of the pagination slice
  endPoint: number = 21; // ending point of the pagination slice
  currentIndex: number = 1; // the pageIndex of the page that the user id currently on
  genres: Genre[] =[]; // array of Genres to hold the Genre Nav
  genre: string; // Genre Selected
  genreActive: boolean = false; // boolean to determine whether the page has been filtered by Genre
  
  private _filter: string;  // variable to hold the passed search/filter constraint  
  // getter for the _filter variable
  get filter(): string{
    return this._filter;
  }

  constructor(private showsAPI: ShowsService,private search: SearchService, private router: Router) { 
     
  }

  ngOnInit() {
    
    // calls the getShows function in the ShowsService 10 times to get the data from the first 10 pages
    for(var i = 1; i <= 10; i++){      
      this.showsAPI.getShows(i).subscribe((result: any = [])=>{
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].first_air_date, 'YYYY-MM-DD').format("MMM D, YYYY");
          this.shows.push(new Show(result.results[i].id, result.results[i].poster_path,  result.results[i].vote_average, result.results[i].name, result.results[i].overview, releaseDate, result.results[i].genre_ids))
        }        
      });      
    }

    // calls the getGenres function in the ShowsService and filters out the uneeded Genres
    this.showsAPI.getGenres().subscribe((result: any = []) =>{
      for(var i = 0; i < result.genres.length; i++){
        if(result.genres[i].name == "Action & Adventure" || result.genres[i].name == "Animation" || 
          result.genres[i].name == "Comedy" || result.genres[i].name == "Drama" ||
          result.genres[i].name == "Family" || result.genres[i].name == "Horror" ||
          result.genres[i].name == "Reality" || result.genres[i].name == "Sci-Fi & Fantasy"){
            this.genres.push(new Genre(result.genres[i].id, result.genres[i].name));
        }        
      }
    });

    /* receives the search constraint from the app.component using the SearchService and calls the setFilter
       function to begin the search/filter process */
    this.search.getSearch().subscribe(searchItem =>{
      if(searchItem !== ""){
        this.setFilter(searchItem);
      }
      else{
        this.filtered = this.shows;
      }   
    });

    // initially sets the filtered array to the shows array
    this.filtered = this.shows;
    this.genreFiltered = this.filtered;
    // tells the app.component to enable the search bar
    this.enableSearch.emit(true);
  }

  // sets the startPoint sent by the pagination component
  setStartPoint($event){
    this.startPoint = $event;
  }

  // sets the endPoint sent by the pagination component
  setEndPoint($event){
    this.endPoint = $event;
  }

  // sets the currentIndex sent by the pagination component
  setCurrentIndex($event){
    this.currentIndex = $event;
  }

  // sets the Genre used in the Page Title
  setGenre($event: string): void{
    this.genre = $event;
    if(this.genre == "Animation"){
      var selectedGenre = "Animated";
      this.heading = `Popular ${selectedGenre} Shows `;
    }
    else{
      this.heading = `Popular ${this.genre} Shows `;
    }    
  }

  // sets the pagination data back to default values
  resetPages(): void{
    this.startPoint = 0;
    this.endPoint = this.startPoint + 21;
    this.currentIndex = 1;
  }

  // sets the search filter recieved from the app.component and sends it to the search function
  setFilter(value: string): void{
    this._filter = value;
    if(this.genreActive == true){
      if(this.genre == "Animation"){
        var selectedGenre = "Animated";
        this.heading = `Popular ${selectedGenre} Show Titles Containing: ${value}`;
      }
      else{
        this.heading = `Popular ${this.genre} Show Titles Containing: ${value}`;
      }
      this.filtered = this.filter ? this.searchShows(this.filter) : this.genreFiltered;
    }
    else{
      this.heading = `Show Titles Containing: ${value}`;
      this.filtered = this.filter ? this.searchShows(this.filter) : this.shows;
    }
    this.resetPages(); 
  }

  // filters based on the selected Genre
  genreFilter($event: number): void{
    this.heading = `Popular ${this.genre} Shows `;
    this.genreFiltered = $event ? this.searchGenres($event) : this.filtered;   
    this.filtered = this.genreFiltered;
    this.genreActive = true;
    this.resetPages(); 
  }

  /* function that holds the search/filter logic, returns an array filled with shows that meet the
     filter constraint */ 
  searchShows(filterBy: string): Show[] {
    filterBy = filterBy.toLowerCase();  
    if(this.genreActive == true){
      return this.genreFiltered.filter((show: Show) =>
        show.title.toLowerCase().indexOf(filterBy) !== -1
      );
    }
    else{      
      return this.shows.filter((show: Show) =>
        show.title.toLowerCase().indexOf(filterBy) !== -1
      );
    }
  }

  // filters based on the selected Genre
  searchGenres(filterBy: number): Show[] {    
    return this.shows.filter((show: Show) =>
        show.genres.indexOf(filterBy) !== -1
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
