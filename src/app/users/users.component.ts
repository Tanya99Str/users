import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/backend/user.service';
import {UserModel} from '../shared/service/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserModel[];
  id: number;

  constructor(private _userService: UserService) {
    this.init();
  }

  init() {
    this._userService.findAllUsers().subscribe(value => {
      this.users = value;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit(): void {
  }

}
