import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router,Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  searchString : string ='';
  public token: any;

  constructor(private router: Router, private a :AuthService){}

  handleSearch(){ 
    this.router.navigate(['/search'], { queryParams: { q: this.searchString }});
    this.searchString = ' '; 
  }

  ngOnInit(): void {
    this.router.events.subscribe((event : Event) => {
      if (event instanceof NavigationStart) { 
        this.token = this.a.readToken();
      }
    });
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
}

  title = 'web422-a4';
}