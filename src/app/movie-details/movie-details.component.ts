import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';


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

  constructor(private http: HttpClient, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }
 

  ngOnInit() {
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.movieId = id;

    this.http.get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`)
      .subscribe((result: any = []) =>{        
        this.movie = new Movie(this.movieId, result.backdrop_path, result.title, result.release_date, result.overview, result.vote_average);
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.release_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
        console.log(this.headerImg)
        console.log(this.movie)
    });

    this.http.get(`https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = result.results[i];
        }
        this.officialTrailer = result.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.officialTrailer}`)
        console.log(this.officialTrailer)
      });

    this.http.get(`https://api.themoviedb.org/3/movie/${this.movieId}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews[i] = result.results[i];
        }
    });     
    
    

  }

  bgImg(){
    return {background : `url(${this.headerImg})`};
  }

}
