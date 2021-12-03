import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }
 
  getArtistById(id:string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}` , { headers: { "Authorization": `Bearer ${token}` } })
  }));
  }
  getAlbumsByArtistId(id:string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } })
  }));
  }
  getAlbumById(id:string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
  }));
  }
  searchArtists(searchString: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } })
  }));
  }
  addToFavourites(id:string): Observable<[string]> {
    return this.http.put<[string]>(`${environment.userAPIBase}/favourites/${id}`,id);
      // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites

  }
  
  removeFromFavourites(id:string): Observable<any> {
    return this.http.delete<[string]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      var x = favouritesArray.indexOf(id);
      favouritesArray.splice(x, 1);
      return this.getFavourites();
    }));
    // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
    // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[string]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      if(favouritesArray.length){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}` , { headers: { "Authorization": `Bearer ${token}` } })
    }));
    }else{ return new Observable(o=>o.next({tracks: []})); }  
    }));
    // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
    // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
  }
}