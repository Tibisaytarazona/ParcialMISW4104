import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { Repository } from '../models/repository.model';
import { RepositoryService } from '../services/repository.service';
import { RepositoryListComponent } from './repository-list.component';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;

  const repositoriesMock: Repository[] = [
    {
      id: 101,
      name: 'repo-101',
      description: 'Angular project',
      language: 'TypeScript',
      stars: 50,
      createdAt: '2025-01-01',
      ownerId: 1
    },
    {
      id: 102,
      name: 'repo-102',
      description: 'Node service',
      language: 'JavaScript',
      stars: 34,
      createdAt: '2025-01-02',
      ownerId: 1
    }
  ];

  const repositoryServiceMock = {
    getRepositories: jasmine.createSpy('getRepositories').and.returnValue(of(repositoriesMock))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RepositoryListComponent],
      providers: [{ provide: RepositoryService, useValue: repositoryServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load repositories on init', () => {
    expect(repositoryServiceMock.getRepositories).toHaveBeenCalled();
    expect(component.repositories.length).toBe(2);
  });

  it('should render repository cards with name, stars and language', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    const cards = nativeElement.querySelectorAll('.repository-card');
    expect(cards.length).toBe(2);
    expect(nativeElement.textContent).toContain('repo-101');
    expect(nativeElement.textContent).toContain('50 stars');
    expect(nativeElement.textContent).toContain('TypeScript');
  });

  it('should render eye button with route to repository detail', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    const link = nativeElement.querySelector('.btn-view') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.getAttribute('ng-reflect-router-link')).toContain('/repositories,101');
  });
});
