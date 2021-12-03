import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  private sub: any;
  favourites: Array<any> = [];
  constructor(private data: MusicDataService) { }
  removeFromFavourites(id:string){
    this.data.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    });
  }
  ngOnInit(): void {
    this.sub = this.data.getFavourites().subscribe(data => {
      this.favourites = data.tracks
    });     
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }
}
