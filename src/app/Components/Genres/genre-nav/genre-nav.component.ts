import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Genre } from 'src/app/Classes/Genres/genre';
import { MoviesService } from 'src/app/Services/Movies/movies.service';

@Component({
  selector: 'app-genre-nav',
  templateUrl: './genre-nav.component.html',
  styleUrls: ['./genre-nav.component.css']
})
export class GenreNavComponent implements OnInit {

  @Output() public filter: EventEmitter<number> = new EventEmitter();
  @Output() public genre: EventEmitter<string> = new EventEmitter();
  genres: Genre[] = [];

  constructor(private movieAPI: MoviesService) { }

  ngOnInit() {
    this.movieAPI.getGenres().subscribe((result: any = []) =>{
      for(var i = 0; i < result.genres.length; i++){
        this.genres.push(new Genre(result.genres[i].id, result.genres[i].name));
      }           
    })
  } 

  genreFilter(id: number, genre: string): void{
    this.filter.emit(id);
    this.genre.emit(genre);
  }

}
