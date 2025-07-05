import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal as model
} from '@angular/core';
import { UsersHttp } from '../../services/users-http/users-http';
import { CommonModule } from '@angular/common';
import { User } from '../../../mocks/data/users';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  protected usersResource = inject(UsersHttp).usersResource;
  protected visibleEntities = model(5);
  protected keys$ = computed(() => {
    const users = this.usersResource.value();

    if (users && users.length > 0) {
      return Object.keys(users[0]) as (keyof User)[];
    }
    return null;
  });

  protected totalPages$ = computed(() => {
    const resource = this.usersResource.value();
    const perPage = this.visibleEntities() ?? 1;

    return resource ? Math.ceil(resource.length / perPage) : 1;
  });

  protected currentPage$ = linkedSignal(() => (this.visibleEntities(), 1));

  protected prevPage() {
    this.currentPage$.update((p) => Math.max(1, p - 1));
  }

  protected nextPage() {
    this.currentPage$.update((p) => Math.min(this.totalPages$(), p + 1));
  }

  protected visibleUsers = computed(() => {
    const resource = this.usersResource.value();
    const visibleEntities = this.visibleEntities();

    const from = (this.currentPage$() - 1) * visibleEntities;

    return resource?.slice(from, from + visibleEntities);
  });
}
