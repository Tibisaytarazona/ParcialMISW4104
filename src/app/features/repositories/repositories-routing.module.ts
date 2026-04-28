import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoryListComponent
  },
  {
    path: ':id',
    component: RepositoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoriesRoutingModule {}
