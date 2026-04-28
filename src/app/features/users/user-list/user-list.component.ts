import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  hasError = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'role-admin';
      case 'editor':
        return 'role-editor';
      case 'viewer':
        return 'role-viewer';
      default:
        return 'role-default';
    }
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
