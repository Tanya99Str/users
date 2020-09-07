import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from '../../shared/service/backend/posts.service';
import {CommentsModel} from '../../shared/service/models/comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId: number;
  comment: CommentsModel[];

  constructor( private _postsService: PostsService) {
  }

  ngOnInit(): void {
    this._postsService.searchCommentByPostId(this.postId).subscribe(next => {
      this.comment = next;
    }, error => {
      console.error(error);
    })
  }

}
