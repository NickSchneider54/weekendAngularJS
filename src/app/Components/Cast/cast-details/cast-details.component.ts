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

  private id: number;
  private birthday: string;
  private details: Object;
  private credits = [];

  // EventEmitter used to tell the app.component to disable the search bar
  @Output() public enableSearch = new EventEmitter();

  constructor(private castAPI: CastService, private route: ActivatedRoute,  private router: Router) {
    
   }

  ngOnInit() {
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    console.log(this.id);

    this.castAPI.getBio(this.id).subscribe((result) =>{
      this.details = result;
      this.birthday = moment(result.birthday, 'YYYY-MM-DD').format('MMM DD, YYYY')
      console.log(this.details);
    });

    this.castAPI.getCredits(this.id).subscribe((result: any = []) =>{
      this.credits = result.cast;
    });

    // tells the app.component that the seach bar should be disabled        
    this.enableSearch.emit(false);
    // tells the browser where to go on load
    this.goToLanding();
  }

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

  goToLanding(){
    var landing = document.getElementById('personal-info');
    landing.scrollIntoView();
  }

}
