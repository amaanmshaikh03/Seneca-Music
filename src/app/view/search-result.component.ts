import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result.component',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit {
  results :any;
  searchQuery: string = '';
  constructor(private activeroute: ActivatedRoute, private musicdatasevice: MusicDataService) { }
  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(params=>{
      this.searchQuery = params['q'];
      this.musicdatasevice.searchArtists(this.searchQuery).subscribe(musicdatasevice=>{
        this.results = musicdatasevice.artists.items.filter((artist:any)=>{
          return artist.images.length > 0 ;     
        })       
      })
    })
  }
}
