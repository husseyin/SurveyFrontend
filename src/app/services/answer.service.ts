import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  url = environment.apiUrl + '/answers';

  constructor(private httpClient: HttpClient) {}

  getAnswers(): Observable<Answer[]> {
    let newUrl = this.url + '/getall';
    return this.httpClient.get<Answer[]>(newUrl);
  }
}
