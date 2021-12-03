import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './view/about.component';
import { AlbumComponent } from './view/album.component';
import { ArtistDiscographyComponent } from './view/artist-discography.component';
import { NewReleasesComponent } from './view/new-releases.component';
import { NotFoundComponent } from './view/not-found.component';


const routes: Routes = [
{ path: 'newReleases', component: NewReleasesComponent },
{ path: 'artist', component: ArtistDiscographyComponent },
{ path: 'album', component: AlbumComponent },
{ path: 'about', component: AboutComponent },
{ path: '', redirectTo: '/newReleases',pathMatch: 'full'},
{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
