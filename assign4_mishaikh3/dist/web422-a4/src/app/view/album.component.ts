import { Component, OnInit } from '@angular/core';
import albumdata  from './../data/SearchResultsAlbum.json';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  album : Array<any> =[];
  constructor() { }

  ngOnInit(): void {
    this.album[0] = albumdata;
  }

}
