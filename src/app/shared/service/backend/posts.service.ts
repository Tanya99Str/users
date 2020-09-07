import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SERVER_API_URL} from '../../config/url';
import {catchError} from 'rxjs/operators';
import {PostsModel} from '../models/posts.model';
import {CommentsModel} from '../models/comments.model';
import {NewPostModel} from '../models/new.post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private _httpClient: HttpClient) {
  }

  postsByUser(userId: number): Observable<PostsModel[]> {
    return this._httpClient.get<PostsModel[]>(`${SERVER_API_URL}/posts?userId=${userId}`)
      .pipe(catchError(err => throwError(err)));
  }

  searchCommentByPostId(postId: number): Observable<CommentsModel[]> {
    return this._httpClient.get<CommentsModel[]>(`${SERVER_API_URL}/comments?postId=${postId}`)
      .pipe(catchError(err => throwError(err)));
  }

  newPost(newPost: NewPostModel): Observable<number> {
    return this._httpClient.post<number>(SERVER_API_URL + '/posts', JSON.stringify(newPost))
      .pipe(catchError(err => throwError(err)));
  }

}
