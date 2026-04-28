import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Repository } from '../models/repository.model';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
  repository: Repository | null = null;
  isLoading = true;
  hasError = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly repositoryService: RepositoryService
  ) {}

  ngOnInit(): void {
    const repositoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(repositoryId)) {
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    this.repositoryService.getRepositoryById(repositoryId).subscribe({
      next: (repository) => {
        if (!repository) {
          this.hasError = true;
          this.isLoading = false;
          return;
        }

        this.repository = repository;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
