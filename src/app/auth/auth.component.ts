import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user/user';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true ;
  isLoading = false ;
  error: string  ;


  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode ;
  }

  onSubmit(f: NgForm) {

    if(!f.valid) {
      return  ;
    }

    const value = f.value ;
    const password = value.password ;
    const email = value.emailaddress ;

    const newUser: User = new User(0, email, value.firstName, value.lastName, value.password, undefined, undefined,undefined) ;

    this.isLoading = true ;

    if(this.isLoginMode) {

      // Log into the system.
      // Need to call the Auth Service
      this.authenticate(email, password) ;

    }else {
      // Sign-up a new user.
      this.userService.addUser(newUser).subscribe(user => {

        // get the Token from the signed up user.
        this.authenticate(email, password) ;

        // Navigate to the Clients View.

      })

    }

    this.isLoading = false;

    f.reset() ;
  }


  authenticate(userName: string, password: string) {


    return this.authService.authenticate(userName, password).subscribe(
      responseData => {
        this.router.navigate(['/clients']);
      },
      error => {
        console.log(error) ;
        this.error = 'Invalid user!' ;
      }
    )

  }


}
