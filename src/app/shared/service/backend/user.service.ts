import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserModel} from '../models/user.model';
import {SERVER_API_URL} from '../../config/url';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private _httpClient: HttpClient) {
  }

  findAllUsers(): Observable<UserModel[]> {
    return this._httpClient.get<UserModel[]>(SERVER_API_URL + '/users')
      .pipe(catchError(err => throwError(err)));

  }

  oneUser(userId: number): Observable<UserModel> {
    return this._httpClient.get<UserModel>(SERVER_API_URL + '/users/' + userId)
      .pipe(catchError(err => throwError(err)));

  }

}
