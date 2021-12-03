import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService {

  constructor(private a : AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes("spotify.com")) {
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.a.getToken()}`
      }
    });
  }

  return next.handle(request);
}

}