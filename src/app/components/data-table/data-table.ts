import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paginator } from '../paginator/paginator';
import { SortingService } from '../../services/sorting-service';
import { HttpResourceRef } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, FormsModule, Paginator],
  providers: [SortingService],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTable<T extends object> {
  readonly dataResource$ = input.required<HttpResourceRef<T[] | undefined>>();
  protected sortService = inject(SortingService<T>);
  protected pageSize$ = signal(5);
  /**
   * Reset the page number to the first page when the page size changes.
   */
  protected currentPage$ = linkedSignal(() => (this.pageSize$(), 1));

  constructor() {
    effect(() => {
      const data = this.dataResource$().value();
      if (data) this.sortService.dataSource$.set(data);
    });
  }

  protected trackByFn(entity: T, index: number) {
    return 'id' in entity ? entity['id'] : index;
  }

  protected keys$ = computed(() => {
    const dataValue = this.dataResource$().value();

    if (dataValue && dataValue.length > 0) {
      return Object.keys(dataValue[0]) as (keyof T)[];
    }
    return null;
  });

  protected totalPages$ = computed(() => {
    const resource = this.dataResource$().value();
    const pageSize = this.pageSize$();

    return resource ? Math.ceil(resource.length / pageSize) : 1;
  });

  protected visibleEntities$ = computed(() => {
    const sortedData = this.sortService.sortedData$();
    if (!sortedData) return null;

    const pageSize = this.pageSize$();
    const from = (this.currentPage$() - 1) * pageSize;

    return sortedData?.slice(from, from + pageSize);
  });
}
