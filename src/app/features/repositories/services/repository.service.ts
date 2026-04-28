import { Injectable } from '@angular/core';

import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  getRepositories(): Repository[] {
    return [];
  }
}
