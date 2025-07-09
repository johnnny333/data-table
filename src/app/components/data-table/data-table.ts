import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { UsersHttp } from '../../services/users-http';
import { CommonModule } from '@angular/common';
import { User } from '../../../mocks/data/users';
import { FormsModule } from '@angular/forms';
import { Paginator } from '../paginator/paginator';
import { SortingService } from '../../services/sorting-service';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, FormsModule, Paginator],
  providers: [SortingService],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  // TODO make this into input which would have a transformer
  protected dataResource = inject(UsersHttp).usersResource;
  protected sortService = inject(SortingService<User>);

  protected pageSize$ = signal(5);
  protected keys$ = computed(() => {
    const users = this.dataResource.value();

    if (users && users.length > 0) {
      return Object.keys(users[0]) as (keyof User)[];
    }
    return null;
  });

  constructor() {
    effect(() => {
      const data = this.dataResource.value();
      if (data) this.sortService.dataSource$.set(data);
    });
  }

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
    const sortedData = this.sortService.sortedData$();
    if (!sortedData) return null;

    const pageSize = this.pageSize$();
    const from = (this.currentPage$() - 1) * pageSize;

    return sortedData?.slice(from, from + pageSize);
  });
}
