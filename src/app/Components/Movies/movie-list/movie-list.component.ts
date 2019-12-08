import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../Classes/Movies/movie';
import { MoviesService } from '../../../Services/Movies/movies.service';
import { Router } from '@angular/router'
import * as moment from 'moment';
import { SearchService } from 'src/app/Services/Search/search.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  // EventEmitter used to tell the app.component to enable the search when navigated to this page
  @Output() public enableSearch = new EventEmitter();
  heading: string = "Popular in Movies";
  movies: Movie[] = []; // array to hold the Show objects created from the data returned by the API call
  filtered: Movie[]; // array of shows that pass the search/filter constraint
  startPoint: number = 0; // starting point of the pagination slice
  endPoint: number = 21; // ending point of the pagination slice
  currentIndex: number = 1; // the pageIndex of the page that the user id currently on  
  private _filter: string;  // variable to hold the passed search/filter constraint  
  
  // getter for the _filter variable
  get filter(): string{
    return this._filter;
  }

  constructor(private movieAPI: MoviesService, private search: SearchService, private router: Router) { }

  ngOnInit() {     

    // calls the getMovies function in the ShowsService 10 times to get the data from the first 10 pages
    for(var i = 1; i <= 10; i++){
      this.movieAPI.getMovies(i).subscribe((result: any = [])=>{        
        for(var i = 0; i < result.results.length; i++){
          var releaseDate = moment(result.results[i].release_date, 'YYYY-MM-DD').format("MM-DD-YYYY");
          this.movies.push(new Movie(result.results[i].id, result.results[i].poster_path, result.results[i].title, releaseDate, result.results[i].overview, result.results[i].vote_average, result.results[i].genre_ids))
        }
      })
    }
    console.log(this.movies)

    // receives the search constraint from the app.component using the SearchService and calls the setFilter
    // function to begin the search/filter process
    this.search.getSearch().subscribe(searchItem =>{
      console.log(searchItem);
      if(searchItem){
        this.setfilter(searchItem);
      }
    }); 

    // initially sets the filtered array to the shows array
    this.filtered = this.movies;
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

  // resets pagination data to their default values
  resetPages(): void{
    this.startPoint = 0;
    this.endPoint = this.startPoint + 21;
    this.currentIndex = 1;
  }

  // sets the search filter recieved from the app.component and sends it to the search function
  setfilter(value: string): void{
    this._filter = value;
    this.heading = `Movie Titles Containing: ${value}`;
    this.filtered = this.filter ? this.searchMovies(this.filter) : this.movies;
  }

  // function that holds the search/filter logic, returns an array filled with movie that meet the
  // filter constraint 
  searchMovies(filterBy: string): Movie[] {
    filterBy = filterBy.toLowerCase(); 
    this.resetPages();   
    return this.movies.filter((movie: Movie) =>
      movie.title.toLowerCase().indexOf(filterBy) !== -1
    );
  }

  // navigates to the top of the page
  goToTop(): void{
    var top = document.getElementById('page-title');
    top.scrollIntoView()
  }

  // builds the url for the chosen movie and then navigates to that url using the router
  onSelect(movie: Movie): void{
    this.router.navigate(['/movie', movie.id]);
  }  

}
