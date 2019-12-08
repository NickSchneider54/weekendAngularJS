import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CastService } from 'src/app/Services/Cast/cast.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {

  private id: number; // variable that holds the slected persons ID
  private birthday: string; // holds the formated birthday
  private details: Object; // object to hold the returned bio-info
  private credits: Object[] = []; // array of objects to hold the movie/show credited
  private truncate: boolean = false; // boolean for whether truncation is needed

  // EventEmitter used to tell the app.component to disable the search bar
  @Output() public enableSearch = new EventEmitter();

  constructor(private castAPI: CastService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    // maps the url, finds and grabs the id
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = id;

    /* calls the getBio function in the CastService and returns the bio-info 
       based on the sent ID */
    this.castAPI.getBio(this.id).subscribe((result) =>{
      this.details = result;
      this.birthday = moment(result.birthday, 'YYYY-MM-DD').format('MMM DD, YYYY');
    });

    /* calls the getBio function in the CastService and returns the movie/show 
       credits of the person based on the sent ID */
    this.castAPI.getCredits(this.id).subscribe((result: any = []) =>{
      this.credits = result.cast;
    });

    // tells the app.component that the seach bar should be disabled        
    this.enableSearch.emit(false);
    // tells the browser where to go on load
    this.goToLanding();
  }

  /* after the component is initialized calls the
     checkForTruncate funtion */
  ngAfterViewInit(){
    this.checkForTruncate();
  }

  // routes the selected credit to the correct select function
  checkMediaType(title): void{
    if(title.media_type == 'movie'){
      this.movieSelect(title.id);
    }
    else if(title.media_type == 'tv'){
      this.showSelect(title.id);
    }
  }

  // generates a URL based on the given movieID and navigates to that 'page'
  movieSelect(id: number): void{
    this.router.navigate(['/movie', id]);
  }

  // generates a URL based on the given showID and navigates to that 'page'
  showSelect(id: number): void{
    this.router.navigate(['/show', id]);
  }

  // sets the landing for the page to the page header and then to scroll to it
  goToLanding(){
    var landing = document.getElementById('personal-info');
    landing.scrollIntoView();
  }  

  // checks if the biography section needs to be truncated
  checkForTruncate(){
    var elemt = document.getElementById('bio-text');
    console.log(elemt.scrollHeight)
    console.log(elemt.clientHeight)
    if(elemt.scrollHeight >= 266){
      this.truncate = true;
    } 
  }

}
