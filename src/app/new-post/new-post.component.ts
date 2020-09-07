import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../shared/service/backend/posts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NewPostModel} from '../shared/service/models/new.post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  userId: number;
  newPostFormGroup: FormGroup;
  titleNull: boolean = false;
  bodyNull: boolean = false;
  invalidTitle: boolean = false;
  newPost: NewPostModel = new NewPostModel();
  openPopUp: boolean = false;
  load: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _postsService: PostsService,
              private _activatedRoute: ActivatedRoute,
              public router: Router) {
    _activatedRoute.queryParams.subscribe(value => {
      if (value['user_id']) {
        this.userId = parseInt(value['user_id']);
        console.log(this.userId);
      }
    });
  }

  create() {
    this.load = true;
    this.invalidTitle = false;
    let title = this.newPostFormGroup.get('title').value;
    let body = this.newPostFormGroup.get('body').value;
    if (!title) {
      this.titleNull = true;
      this.load = false;
    }
    if (!body) {
      this.bodyNull = true;
      this.load = false;
    }
    if (title) {
      let mRe = new RegExp('[^0-9]');
      if (!mRe.exec(title)) {
        this.invalidTitle = true;
        this.load = false;
      }
    }
    this.newPost.userId = this.userId;
    this.newPost.title = this.newPostFormGroup.get('title').value;
    this.newPost.body = this.newPostFormGroup.get('body').value;
    console.log(title);
    if (this.newPostFormGroup.valid && !this.invalidTitle) {
      this._postsService.newPost(this.newPost).subscribe(next => {
        this.openPopUp = true;
        this.load = false;
        this.titleNull = false;
        this.bodyNull = false;
        this.invalidTitle = false;
        this.newPostFormGroup.reset();
      }, error => {
        this.load = false;
        this.titleNull = false;
        this.bodyNull = false;
        this.invalidTitle = false;
        console.error(error);
      });
    }
  }

  ngOnInit(): void {
    this.newPostFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

}
