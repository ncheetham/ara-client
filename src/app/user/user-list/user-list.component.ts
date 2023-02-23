import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  usersChangedSubscription: Subscription ;
  userSelectedSubscription: Subscription ;
  selectedUser: User ;
  displayedColumns: string[] = ['userId',  'lastName', 'firstName', 'emailAddress'];

  ngOnDestroy(): void {
    this.usersChangedSubscription.unsubscribe()  ;
  }

  users: User[] = []  ;

  ngOnInit(): void {

    this.userService.findAllUsers().subscribe(users => this.users = users) ;

    this.usersChangedSubscription = this.userService.usersChangeSubscription.subscribe(x => {
      this.userService.findAllUsers().subscribe(x=> this.users = x) ; 
    }
    );

    this.userSelectedSubscription = this.userService.userSelected.subscribe(x=> {
      this.userService.findUser(x).subscribe(user => this.selectedUser = user) ;
    })

  }


  onSelect(user: User) {

    this.userService.userSelected.next(user.userId) ;
  }

}
