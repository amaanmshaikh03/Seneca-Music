import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './view/about.component';
import { AlbumComponent } from './view/album.component';
import { ArtistDiscographyComponent } from './view/artist-discography.component';
import { NewReleasesComponent } from './view/new-releases.component';
import { NotFoundComponent } from './view/not-found.component';
import { FavouritesComponent } from './view/favourites.component';
import { SearchResultComponent } from './view/search-result.component';
import { GuardAuthService } from './guard-auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'newReleases', component: NewReleasesComponent , canActivate: [GuardAuthService]},
  { path: 'artist/:id', component: ArtistDiscographyComponent , canActivate: [GuardAuthService]},
  { path: 'album/:id', component: AlbumComponent , canActivate: [GuardAuthService]},
  { path: 'about', component: AboutComponent , canActivate: [GuardAuthService]},
  {path: 'favourites', component:FavouritesComponent, canActivate: [GuardAuthService]},
  {path: 'search', component: SearchResultComponent, canActivate: [GuardAuthService]},
  { path: '', redirectTo: '/newReleases',pathMatch: 'full'},
  {path: 'register', component:RegisterComponent},
  { path: 'login', component:LoginComponent},
  { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
