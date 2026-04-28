import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private readonly repositoriesUrl =
    'https://gist.githubusercontent.com/caev03/628509e0b3fe41dd44f6a2ab09d81ef9/raw/f847eafbecca47287ff0faec4de1329b874f5711/repositories.json';

  constructor(private readonly http: HttpClient) {}

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.repositoriesUrl);
  }

  getRepositoryById(id: number): Observable<Repository | undefined> {
    return this.getRepositories().pipe(map((repositories) => repositories.find((item) => item.id === id)));
  }
}
