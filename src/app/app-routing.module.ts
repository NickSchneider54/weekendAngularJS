import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'movies', component: MovieListComponent},
  {path: 'shows', component: ShowListComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'show/:id', component: ShowDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [MovieListComponent, ShowListComponent, MovieDetailsComponent, ShowDetailsComponent]
