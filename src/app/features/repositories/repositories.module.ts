import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoriesRoutingModule } from './repositories-routing.module';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';

@NgModule({
  declarations: [RepositoryListComponent, RepositoryDetailComponent],
  imports: [CommonModule, RepositoriesRoutingModule]
})
export class RepositoriesModule {}
