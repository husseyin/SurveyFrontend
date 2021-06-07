import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAnswer } from '../models/user-answer';

@Injectable({
  providedIn: 'root',
})
export class UserAnswerService {
  url = environment.apiUrl + '/useranswers';

  constructor(private httpClient: HttpClient) {}

  getUserAnswers(): Observable<UserAnswer[]> {
    let newUrl = this.url + '/getall';
    return this.httpClient.get<UserAnswer[]>(newUrl);
  }

  userAnswerAdd(userAnswer: UserAnswer): Observable<UserAnswer> {
    let newUrl = this.url + '/add';
    return this.httpClient.post<UserAnswer>(newUrl, userAnswer);
  }
}
