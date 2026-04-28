import { Component, OnInit } from '@angular/core';

import { Repository } from '../models/repository.model';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {
  repositories: Repository[] = [];
  isLoading = true;
  hasError = false;

  constructor(private readonly repositoryService: RepositoryService) {}

  ngOnInit(): void {
    this.loadRepositories();
  }

  private loadRepositories(): void {
    this.repositoryService.getRepositories().subscribe({
      next: (repositories) => {
        this.repositories = repositories;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
