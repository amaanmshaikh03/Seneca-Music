import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser : RegisterUser = {} as RegisterUser;
  warning :string ="";
  success: boolean =false;
  loading : boolean=false;

  constructor(private a: AuthService,  private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if(this.registerUser.userName.length == 0 ){
     this.warning = "User name can't be blank";
    }
    else if(this.registerUser.password.normalize() !== this.registerUser.password2.normalize()){
      this.warning = "Password don't match"
    }else{
    this.loading = true;
    this.a.register(this.registerUser).subscribe((success) => {
      this.success = true;
      this.warning = "";
      this.loading = false;
    },
    (err) => {
      this.success = false;
        this.warning = err.error.message;
        this.loading = false;
    });
  
    }
  }
}