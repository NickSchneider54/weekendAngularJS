import { Component, OnChanges } from '@angular/core';
import { SearchService } from './Services/Search/search.service';
import { MoviesService } from './Services/Movies/movies.service';
import { Genre } from 'src/app/Classes/Genres/genre';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  navbarOpen: boolean = false; // holds the value that determines whether the nav is toggled open or closed
  searchEnabled: boolean = false; // holds the value that determines whether the search is enabled
  searchItem: string; // holds the search/filter constraint entered by the user
  title = 'Final Project'; // holds the title that displayed in the jumbotron
  genres: Genre[] = [];

  constructor(private movieAPI: MoviesService, private search: SearchService){}

  // sends the search constraint inputted by the user to the SearchService
  sendSearch(searchItem: string): void{
    this.search.sendSearch(searchItem);
  }

  // takes th opposite of what the navbarOpen varivale is currently
  // set to in order to toggle the collapsable navbar
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

  /* emits an activate event that checks to see if
     the search bar should be enabled or disabled
     whenever a new component is inititalized/created */
  onActivate(componentReference): void{
    componentReference.enableSearch.subscribe((data:boolean)=>{
      this.searchEnabled = data;
      this.searchItem = "";
    });
 }

}
