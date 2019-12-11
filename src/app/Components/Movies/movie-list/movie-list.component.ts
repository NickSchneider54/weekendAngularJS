import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../Classes/Movies/movie';
import { Genre } from 'src/app/Classes/Genres/genre';
import { MoviesService } from '../../../Services/Movies/movies.service';
import { Router, NavigationEnd } from '@angular/router'
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
  heading: string = "Popular Movies"; // Page title
  movies: Movie[] = []; // array to hold the Show objects created from the data returned by the API call
  genreFiltered: Movie[]; // array to hold the movies filtered by the selected Genre
  filtered: Movie[]; // array of shows that pass the search/filter constraint
  startPoint: number = 0; // starting point of the pagination slice
  endPoint: number = 21; // ending point of the pagination slice
  currentIndex: number = 1; // the pageIndex of the page that the user id currently on  
  private _filter: string;  // variable to hold the passed search/filter constraint  
  genres: Genre[] = []; // array of Genres to hold the Genre Nav
  genre: string; // Genre Selected
  genreActive: boolean = false; // boolean to determine whether the page has been filtered by Genre

  // getter for the _filter variable
  get filter(): string{
    return this._filter;
  }

  constructor(private movieAPI: MoviesService, private search: SearchService, private router: Router) { 
    
    // tells the Router not to use the last URL navigated to on reload
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // tricks the Router into believing it's last link wasn't previously loaded
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /* "tells" the router that the last routerLink visited was never 
           actually navigated to */
        this.router.navigated = false;
      }
    });
  }

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

    // calls the getGenres function in the moviesService and filters out the uneeded Genres
    this.movieAPI.getGenres().subscribe((result: any = []) =>{
      for(var i = 0; i < result.genres.length; i++){
        if(result.genres[i].name == "Action" || result.genres[i].name == "Adventure" || 
          result.genres[i].name == "Comedy" || result.genres[i].name == "Drama" ||
          result.genres[i].name == "Family" || result.genres[i].name == "Horror" ||
          result.genres[i].name == "Romance" || result.genres[i].name == "Animation" ||
          result.genres[i].name == "Science Fiction"){
            this.genres.push(new Genre(result.genres[i].id, result.genres[i].name));
        }        
      }           
    })

    // receives the search constraint from the app.component using the SearchService and calls the setFilter
    // function to begin the search/filter process
    this.search.getSearch().subscribe(searchItem =>{
      if(searchItem !== ""){
        this.setFilter(searchItem);
      }
      else{
        this.filtered = this.movies;
      }   
    }); 

    // initially sets the filtered array to the shows array
    this.filtered = this.movies;
    this.genreFiltered = this.filtered;
    // tells the app.component to enable the search bar
    this.enableSearch.emit(true);  
  }
 
  // sets the startPoint sent by the pagination component
  setStartPoint($event: number): void{
    this.startPoint = $event;
  }

  // sets the endPoint sent by the pagination component
  setEndPoint($event: number): void{
    this.endPoint = $event;
  }

  // sets the currentIndex sent by the pagination component
  setCurrentIndex($event: number): void{
    this.currentIndex = $event;
  }

  // sets the Genre used in the Page Title
  setGenre($event: string): void{
    this.genre = $event;
    if(this.genre == "Animation"){
      var selectedGenre = "Animated";
      this.heading = `Popular ${selectedGenre} Movies`;
    }
    else{
      this.heading = `Popular ${this.genre} Movies`;
    }
  }

  // resets pagination data to their default values
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
        this.heading = `Popular ${selectedGenre} Movie Titles Containing: ${value}`;
      }
      else{
        this.heading = `Popular ${this.genre} Movie Titles Containing: ${value}`;
      }
      this.filtered = this.filter ? this.searchMovies(this.filter) : this.genreFiltered;
    }
    else{
      this.heading = `Movie Titles Containing: ${value}`;
      this.filtered = this.filter ? this.searchMovies(this.filter) : this.movies;
    }
    this.resetPages(); 
  }

  // filters based on the selected Genre
  genreFilter($event: number): void{
    this.heading = `Popular ${this.genre} Movies `;
    this.genreFiltered = $event ? this.searchGenres($event) : this.filtered;   
    this.filtered = this.genreFiltered;
    this.genreActive = true;
    this.resetPages(); 
  }

  // function that holds the search/filter logic, returns an array filled with movie that meet the
  // filter constraint 
  searchMovies(filterBy: string): Movie[] {
    filterBy = filterBy.toLowerCase();       
    if(this.genreActive == true){
      return this.genreFiltered.filter((movie: Movie) =>
        movie.title.toLowerCase().indexOf(filterBy) !== -1
      );
    }
    else{      
      return this.movies.filter((movie: Movie) =>
        movie.title.toLowerCase().indexOf(filterBy) !== -1
      );
    }
  }

  // filters based on the selected Genre
  searchGenres(filterBy: number): Movie[] {    
    return this.movies.filter((movie: Movie) =>
        movie.genre.indexOf(filterBy) !== -1
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
