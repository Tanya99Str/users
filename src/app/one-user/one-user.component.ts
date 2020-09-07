import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/service/backend/user.service';
import {UserModel} from '../shared/service/models/user.model';
import {PostsService} from '../shared/service/backend/posts.service';
import {PostsModel} from '../shared/service/models/posts.model';
import {CommentsModel} from '../shared/service/models/comments.model';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit {

  userId: number;
  posts: PostsModel[];
  comment: CommentsModel[];
  users: UserModel[];
  user: UserModel;
  oneUser: UserModel;
  description: string;
  limit: number = 50;
  more: boolean = false;

  constructor(private _userService: UserService,
              private _postsService: PostsService,
              private _activatedRoute: ActivatedRoute) {
    _activatedRoute.queryParams.subscribe(value => {
      if (value['user_id']) {
        this.userId = parseInt(value['user_id']);
      }
      this.init();
    });
  }

  init() {
    this._postsService.postsByUser(this.userId).subscribe(next => {
      this.posts = next;
    }, error => {
      console.error(error);
    });
    this._userService.oneUser(this.userId).subscribe(next => {
      this.oneUser = next;
      console.log(this.user);
    }, error => {
      console.error(error);
    })
  }

  changeLimit(p: string, limit: number): string {
    let text = [];
    text = p.split('');
    if (text.length > limit) {
      this.description = text.slice(0, limit).join('');
    } else {
      this.description = p;
    }
    return this.description;
  }

  ngOnInit(): void {
  }

}
