import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private url = environment.apiUrl + '/companies';

  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    let newUrl = this.url + '/getall';
    return this.httpClient.get<Company[]>(newUrl);
  }
}
