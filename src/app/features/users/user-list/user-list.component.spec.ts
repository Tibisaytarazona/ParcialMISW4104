import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { User } from '../models/user.model';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const usersMock: User[] = [
    {
      id: 1,
      username: 'user1',
      name: 'User One',
      email: 'user1@mail.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      role: 'admin',
      location: 'Bogota',
      repoIds: [101, 102]
    },
    {
      id: 2,
      username: 'user2',
      name: 'User Two',
      email: 'user2@mail.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      role: 'editor',
      location: 'Medellin',
      repoIds: [103]
    }
  ];

  const userServiceMock = {
    getUsers: jasmine.createSpy('getUsers').and.returnValue(of(usersMock))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserListComponent, UserDetailComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userServiceMock.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
  });

  it('should render user cards with names and role class', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    const cards = nativeElement.querySelectorAll('.user-card');
    expect(cards.length).toBe(2);
    expect(nativeElement.textContent).toContain('User One');

    const adminRole = nativeElement.querySelector('.role-badge.role-admin');
    expect(adminRole).toBeTruthy();
  });

  it('should open popup when clicking view more button', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const button = nativeElement.querySelector('.btn-view') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(component.selectedUser?.id).toBe(1);
    expect(nativeElement.querySelector('app-user-detail')).toBeTruthy();
  });

  it('should render assigned repository links to repository detail', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const repoLink = nativeElement.querySelector('.repo-link') as HTMLAnchorElement;

    expect(repoLink).toBeTruthy();
    expect(repoLink.textContent).toContain('Repo 101');
    expect(repoLink.getAttribute('ng-reflect-router-link')).toContain('/repositories,101');
  });
});
