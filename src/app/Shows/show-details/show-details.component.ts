import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showId: number;
  headerImg: string;
  releaseDate: string;
  show: object = [];
  reviews = [];
  trailers = [];
  officialTrailer: string;
  videoUrl;

  constructor(private showsAPI: ShowsService, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let id  = parseInt(this.route.snapshot.paramMap.get('id'));
    this.showId = id;
    
    this.showsAPI.getShow(this.showId)
      .subscribe((result: any = []) =>{        
        this.show = result;
        this.headerImg = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        this.releaseDate = moment(result.first_air_date, 'YYYY-MM-DD').format("MMM DD, YYYY");
        console.log(this.headerImg)
        console.log(this.show)
    });

    this.showsAPI.getTrailers(this.showId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.trailers[i] = result.results[i];
        }
        this.officialTrailer = result.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.officialTrailer}`)
        console.log(this.officialTrailer)
    });

    this.showsAPI.getReviews(this.showId)
      .subscribe((result: any = []) =>{
        for(var i = 0; i < result.results.length; i++){
          this.reviews[i] = result.results[i];
        }
    }); 

    this.goToLanding();

  }

  goToLanding(){
    var landing = document.getElementById('show-header');
    landing.scrollIntoView();
  }

  bgImg(){
    return {background : `url(${this.headerImg})`};
  }

}
