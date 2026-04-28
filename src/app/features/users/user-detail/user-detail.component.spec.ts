import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from '../models/user.model';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  const userMock: User = {
    id: 1,
    username: 'user1',
    name: 'User One',
    email: 'user1@mail.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    location: 'Bogota',
    repoIds: [101, 102]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    component.user = userMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user detail information', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    expect(nativeElement.textContent).toContain('User One');
    expect(nativeElement.textContent).toContain('user1@mail.com');
  });

  it('should emit close event', () => {
    spyOn(component.close, 'emit');

    component.onClose();

    expect(component.close.emit).toHaveBeenCalled();
  });
});
