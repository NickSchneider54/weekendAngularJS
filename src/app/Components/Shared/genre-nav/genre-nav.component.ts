import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Genre } from 'src/app/Classes/Genres/genre';

@Component({
  selector: 'app-genre-nav',
  templateUrl: './genre-nav.component.html',
  styleUrls: ['./genre-nav.component.css']
})
export class GenreNavComponent implements OnInit {

  @Output() public filter: EventEmitter<number> = new EventEmitter();
  @Output() public genre: EventEmitter<string> = new EventEmitter();
  @Input() genres: Genre[];

  constructor() { }

  ngOnInit() { } 

  genreFilter(id: number, genre: string): void{
    this.filter.emit(id);
    this.genre.emit(genre);
  }

}
