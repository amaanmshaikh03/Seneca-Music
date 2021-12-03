import { Component, OnInit } from '@angular/core';
import abd from './../data/SearchResultsAlbums.json';
import atd from './../data/SearchResultsArtist.json';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html'
})
export class ArtistDiscographyComponent implements OnInit {
  albums : Array<any> = [];
  artists : Array<any> = [];
  constructor() { }
  ngOnInit(): void {
    this.albums = abd.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
    this.artists[0] = atd;
  }
  imagdis(){
    var atimg = `url(${this.artists[0].images[0].url}) no-repeat center center`;
    return atimg;
  } 
}
