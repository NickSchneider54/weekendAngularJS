import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movieId;
  public headerImg: string;
  public movie: object[];
  public reviews = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }



  ngOnInit() {
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.movieId = id;

    this.http.get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`)
      .subscribe((result: object[]) =>{        
        this.movie = result;
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        console.log(this.headerImg)
        console.log(this.movie)
      });

    this.http.get(`https://api.themoviedb.org/3/movie/${this.movieId}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`)
      .subscribe((result: any = []) =>{
        for(var i = 0; i <result.results.length; i++){
          this.reviews[i] = result.results[i];
        }
      });     
    
  }

  bgImg(){
    return {background : `url(${this.headerImg})`};
  }

}
