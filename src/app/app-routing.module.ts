import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


const routes: Routes = [
  // {path: 'home', component: AppComponent},
  {path: 'movies', component: MovieListComponent},
  {path: 'shows', component: ShowListComponent},
  {path: 'movie/:id', component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [MovieListComponent, ShowListComponent, MovieDetailsComponent]
