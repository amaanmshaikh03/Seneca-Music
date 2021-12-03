import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
})
export class NewReleasesComponent implements OnInit {
  private sub: any;
  releases: Array<any> = [];
    constructor(private muscidataservice: MusicDataService){}
    ngOnInit(): void{
      this.sub = this.muscidataservice.getNewReleases().subscribe(muscidataservice =>{ this.releases = muscidataservice.albums.items;});    
    }
    ngOnDestroy(): void{
      this.sub.unsubscribe();
    }
}
