import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search = new Subject<string>();

  sendSearch(searchItem: string){
    this.search.next(searchItem);
  }

  getSearch(): Observable<any>{
    return this.search.asObservable();
  }

  constructor() { }
}
