import { Component } from '@angular/core';
import { SearchService } from './Services/Search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navbarOpen: boolean = false; // holds the value that determines whether the nav is toggled open or closed
  searchEnabled: boolean = false; // holds the value that determines whether the search is enabled
  searchItem: string; // holds the search/filter constraint entered by the user
  title = 'Weekend Project'; // holds the title that displayed in the jumbotron

  constructor(private search: SearchService){}

  // sends the search constraint inputted by the user to the SearchService
  sendSearch(searchItem: string): void{
    this.search.sendSearch(searchItem);
  }

  // takes th opposite of what the navbarOpen varivale is currently
  // set to in order to toggle the collapsable navbar
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

  onActivate(componentReference): void{
    componentReference.enableSearch.subscribe((data:boolean)=>{
      this.searchEnabled = data;
      this.searchItem = "";
    });
 }

}
