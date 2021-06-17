import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private url = environment.apiUrl + '/questions';

  constructor(private httpClient: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    let newUrl = this.url + '/getall';
    return this.httpClient.get<Question[]>(newUrl);
  }

  getQuestionsByCompanyId(companyId: number): Observable<Question[]> {
    let newUrl = this.url + '/getbycompanyid?companyId=' + companyId;
    return this.httpClient.get<Question[]>(newUrl);
  }

  questionAdd(question: Question): Observable<Question> {
    let newUrl = this.url + '/add';
    return this.httpClient.post<Question>(newUrl, question);
  }

  questionDelete(question: Question): Observable<Question> {
    let newUrl = this.url + '/delete';
    return this.httpClient.post<Question>(newUrl, question);
  }
}
