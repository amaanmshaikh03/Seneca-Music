import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  album : any;
  constructor(private route: ActivatedRoute, private snackBar : MatSnackBar, private data: MusicDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      let ID = params['id'];
      this.data.getAlbumById(ID).subscribe(data =>{
        this.album = data;
        console.log(this.album);
      })
    });
  }
  addToFavourites(trackID: string){
    this.data.addToFavourites(trackID).subscribe((success)=>{
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      console.log(success);
    },(error)=>{
      this.snackBar.open("There was an Error","",{duration:1000} );
      console.log(error);
    });
  }
}
