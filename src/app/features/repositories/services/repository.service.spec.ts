import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Repository } from '../models/repository.model';
import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepositoryService]
    });

    service = TestBed.inject(RepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request repositories from remote endpoint', () => {
    const repositoriesMock: Repository[] = [
      {
        id: 101,
        name: 'repo-101',
        description: 'Angular project',
        language: 'TypeScript',
        stars: 50,
        createdAt: '2025-01-01',
        ownerId: 1
      }
    ];

    service.getRepositories().subscribe((repositories) => {
      expect(repositories).toEqual(repositoriesMock);
    });

    const req = httpMock.expectOne(
      'https://gist.githubusercontent.com/caev03/628509e0b3fe41dd44f6a2ab09d81ef9/raw/f847eafbecca47287ff0faec4de1329b874f5711/repositories.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(repositoriesMock);
  });
});
