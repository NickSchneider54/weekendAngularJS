import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './Components/Movies/movie-list/movie-list.component';
import { ShowListComponent } from './Components/Shows/show-list/show-list.component';
import { MovieDetailsComponent } from './Components/Movies/movie-details/movie-details.component';
import { ShowDetailsComponent } from './Components/Shows/show-details/show-details.component';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
import { CastDetailsComponent } from './Components/Cast/cast-details/cast-details.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'movies', component: MovieListComponent},
  {path: 'shows', component: ShowListComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'show/:id', component: ShowDetailsComponent},
  {path: 'person/:id/:name', component: CastDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [HomePageComponent, MovieListComponent, ShowListComponent, MovieDetailsComponent, ShowDetailsComponent, CastDetailsComponent]
