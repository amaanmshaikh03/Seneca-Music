import { Component, OnInit } from '@angular/core';
import data from '../data/NewReleasesAlbums.json';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
})
export class NewReleasesComponent implements OnInit {
  releases: Array<any> = [];
    constructor(){}
    ngOnInit(): void{
        this.releases = data.albums.items;
    }
}
