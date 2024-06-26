import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false ;

  userSubscription: Subscription ;

  constructor(private authService: AuthService) { }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.userSubscription = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user ;
    });
  }

  onLogout() {
    this.authService.logout() ; 
  }

}
