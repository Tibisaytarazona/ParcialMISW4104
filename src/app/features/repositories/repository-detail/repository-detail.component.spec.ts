import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { Repository } from '../models/repository.model';
import { RepositoryService } from '../services/repository.service';
import { RepositoryDetailComponent } from './repository-detail.component';

describe('RepositoryDetailComponent', () => {
  let component: RepositoryDetailComponent;
  let fixture: ComponentFixture<RepositoryDetailComponent>;

  const repositoryMock: Repository = {
    id: 101,
    name: 'repo-101',
    description: 'Angular project',
    language: 'TypeScript',
    stars: 50,
    createdAt: '2025-01-01',
    ownerId: 1
  };

  const repositoryServiceMock = {
    getRepositoryById: jasmine.createSpy('getRepositoryById').and.returnValue(of(repositoryMock))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RepositoryDetailComponent],
      providers: [
        { provide: RepositoryService, useValue: repositoryServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '101'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load repository detail from route id', () => {
    expect(repositoryServiceMock.getRepositoryById).toHaveBeenCalledWith(101);
    expect(component.repository?.name).toBe('repo-101');
  });

  it('should render all repository data', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    expect(nativeElement.textContent).toContain('repo-101');
    expect(nativeElement.textContent).toContain('Angular project');
    expect(nativeElement.textContent).toContain('TypeScript');
    expect(nativeElement.textContent).toContain('50');
    expect(nativeElement.textContent).toContain('2025-01-01');
    expect(nativeElement.textContent).toContain('1');
  });
});
