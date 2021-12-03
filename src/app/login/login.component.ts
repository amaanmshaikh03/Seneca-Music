import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private a : AuthService, private router : Router) { }

  user : User = {} as User;
  warning : string = "";
  loading: boolean= false;


  ngOnInit(): void {}

  onSubmit(f: NgForm){
    if(this.user.userName.length == 0 ){
     this.warning = "User name can't be blank.";
    }
    else if(this.user.password.length == 0){
      this.warning = "Password can't be blank."
    }else{
      this.loading = true;
    this.a.login(this.user).subscribe((success) => {
      this.loading = false;
      localStorage.setItem("access_token",success.token);
      this.router.navigate(['/newReleases']);

      this.warning = "";
      this.loading = false;
    },
    (err) => {
        this.warning = err.error.message;
        this.loading = false;
    });
  
    }
  }

}