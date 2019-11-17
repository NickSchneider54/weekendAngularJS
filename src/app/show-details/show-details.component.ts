import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showId;
  headerImg: string;
  releaseDate: string;
  show: object = [];
  reviews = [];
  trailers = [];
  officialTrailer: string;
  videoUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.showId = id;
    
    this.http.get(`https://api.themoviedb.org/3/tv/${this.showId}?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`)
      .subscribe((result: any = []) =>{        
        this.show = result;
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        // this.releaseDate = moment(result.release_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
        console.log(this.headerImg)
        console.log(this.show)
    });

    this.http.get(`https://api.themoviedb.org/3/tv/${this.showId}/videos?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US`)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = result.results[i];
        }
        this.officialTrailer = result.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.officialTrailer}`)
        console.log(this.officialTrailer)
    });

    this.http.get(`https://api.themoviedb.org/3/tv/${this.showId}/reviews?api_key=88fa8cb9c6ebb34aaa7cc7e7e074c1a9&language=en-US&page=1`)
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
