import { Component, OnInit} from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId;
  headerImg: string;
  releaseDate: string;
  movie: object = [];
  reviews = [];
  trailers = [];
  officialTrailer: string;
  videoUrl;  
  fragment: string;

  constructor(private movieAPI: MoviesService, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }
 
  ngOnInit() {
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.movieId = id;

    this.route.fragment.subscribe((fragment: string) =>{
      this.fragment = fragment;
    })
    

    this.movieAPI.getMovie(this.movieId)
      .subscribe((result: any = []) =>{        
        this.movie = new Movie(this.movieId, result.backdrop_path, result.title, result.release_date, result.overview, result.vote_average);
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.release_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
        console.log(this.headerImg)
        console.log(this.movie)
    });

    this.movieAPI.getTrailers(this.movieId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = result.results[i];
        }
        this.officialTrailer = result.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.officialTrailer}`)
        console.log(this.officialTrailer)
      });

    this.movieAPI.getReviews(this.movieId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews[i] = result.results[i];
        }
    });        

    this.goToLanding();

  }

  goToLanding(){
    var landing = document.getElementById('header');
    landing.scrollIntoView();
  }

  bgImg(){
    return {background : `url(${this.headerImg})`};
  }

}
