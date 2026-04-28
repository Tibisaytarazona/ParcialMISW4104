import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { User } from '../models/user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request users from remote endpoint', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        username: 'user1',
        name: 'User One',
        email: 'user1@mail.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        role: 'admin',
        location: 'Bogota',
        repoIds: [101, 102]
      }
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      'https://gist.githubusercontent.com/caev03/628509e0b3fe41dd44f6a2ab09d81ef9/raw/f847eafbecca47287ff0faec4de1329b874f5711/users.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
