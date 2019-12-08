import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { Show } from '../../../Classes/Shows/show';
import { Movie } from '../../../Classes/Movies/movie';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

  @Input() movieRecommended: Movie[] = []; // array of recommended Movies
  @Input() showsRecommended: Show[] = []; // array of recommended Shows
  @Input() title: string; // variable to hold the title of the selected Movie/Show
  constructor(private router: Router) { }

  ngOnInit() { }

  // checks the object type of clicked title and then sends it to the proper
  // function to generate the proper URL
  checkMediaType(title: Object): void{
    if(title instanceof Movie){
      this.movieSelect(title);
    }
    else if(title instanceof Show){
      this.showSelect(title);
    }
  }

  // generates a URL based on the given movieID and navigates to that 'page'
  movieSelect(movie: Movie): void{
    this.router.navigate(['/movie', movie.id]);
  }

  // generates a URL based on the given showID and navigates to that 'page'
  showSelect(show: Show): void{
    this.router.navigate(['/show', show.id]);
  }

}
