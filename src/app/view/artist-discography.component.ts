import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html'
})
export class ArtistDiscographyComponent implements OnInit {
  albums : Array<any> = [];
  artists : any;
  constructor(private musicdataservice : MusicDataService, private activeroute: ActivatedRoute) { }
  ngOnInit(): void{
    this.activeroute.params.subscribe(params=>{
      let ID = params['id'];
      this.musicdataservice.getArtistById(ID).subscribe(musicdataservice =>{ this.artists = musicdataservice;
      });
      this.musicdataservice.getAlbumsByArtistId(ID).subscribe(musicdataservice =>{
        var names = new Array;
        this.albums = musicdataservice.items.filter((obj:any, index:any) => {        
          if(!names.includes(obj.name)){
            names.push(obj.name)
            return true;
          }else{
            return false;
          };
      });     
    })
  });
  }
  imagdis(){
    var atimg = `url(${this.artists.images[0].url}) no-repeat center center`;
    return atimg;
  } 
}
