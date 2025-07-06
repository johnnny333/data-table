import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { UsersHttp } from '../../services/users-http/users-http';
import { CommonModule } from '@angular/common';
import { User } from '../../../mocks/data/users';
import { FormsModule } from '@angular/forms';
import { Paginator } from '../paginator/paginator';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, FormsModule, Paginator],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  protected dataResource = inject(UsersHttp).usersResource;
  protected pageSize$ = signal(5);
  protected keys$ = computed(() => {
    const users = this.dataResource.value();

    if (users && users.length > 0) {
      return Object.keys(users[0]) as (keyof User)[];
    }
    return null;
  });

  protected totalPages$ = computed(() => {
    const resource = this.dataResource.value();
    const pageSize = this.pageSize$();

    return resource ? Math.ceil(resource.length / pageSize) : 1;
  });

  /**
   * Reset the page number to the first page when the page size changes.
   */
  protected currentPage$ = linkedSignal(() => (this.pageSize$(), 1));

  protected visibleEntities$ = computed(() => {
    const sortedData = this.sortedData$();
    if (!sortedData) return null;

    const pageSize = this.pageSize$();
    const from = (this.currentPage$() - 1) * pageSize;

    return sortedData?.slice(from, from + pageSize);
  });

  protected currentSortField$ = signal<keyof User | null>(null);
  protected sortDirection$ = signal<'asc' | 'desc'>('asc');

  protected setSortVars(field: keyof User) {
    const currentDirection = this.sortDirection$(),
      sortField = this.currentSortField$();

    if (field === sortField) {
      const newSortDirection = currentDirection === 'asc' ? 'desc' : 'asc';
      this.sortDirection$.set(newSortDirection);
    } else {
      this.sortDirection$.set('asc');
      this.currentSortField$.set(field);
    }
  }

  private sortedData$ = computed(() => {
    const resource = this.dataResource.value();
    const currentSortField = this.currentSortField$();
    const sortDirection = this.sortDirection$();

    if (!resource || !currentSortField) {
      return resource;
    }

    return [...resource].sort((a, b) => {
      const valueA = a[currentSortField],
        valueB = b[currentSortField];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
  });
}
