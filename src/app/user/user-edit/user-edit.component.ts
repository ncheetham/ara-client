import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', {static: false}) uForm: NgForm ;

  selectedUser: User = new User(0, '' , '', '', undefined, undefined, undefined, undefined);

  userSelectedSubscription: Subscription ;
  editMode = false ;

  constructor(private userService: UserService) { }


  ngOnDestroy(): void {
    this.userSelectedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    this.userSelectedSubscription = this.userService.userSelected.subscribe(x=>
      {
        this.userService.findUser(x).subscribe(user => this.selectedUser = user) ;
        this.editMode = true ;
      }) ;

  }


  onAddUser(form: NgForm) {

    const newUser: User = new User(this.selectedUser.userId, this.selectedUser.emailAddress,
      this.selectedUser.firstName, this.selectedUser.lastName, undefined, undefined, undefined, undefined) ;

    if(this.editMode) {

      this.userService.updateUser(newUser.userId, newUser).subscribe() ;

    }else {

      this.userService.addUser(newUser).subscribe()  ;

    }

    this.onClear() ;

  }

  onClear() {
    this.uForm.reset() ;
    this.editMode = false ;
  }

  onDelete() {

    this.userService.deleteUser(this.selectedUser.userId).subscribe() ;
    this.onClear() ;

  }

}
