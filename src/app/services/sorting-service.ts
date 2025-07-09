import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class SortingService<T> {
  public currentSortField$ = signal<keyof T | null>(null);
  public sortDirection$ = signal<'asc' | 'desc'>('asc');
  public dataSource$ = signal<T[]>([]);

  public setSortField(field: keyof T) {
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

  public sortedData$ = computed(() => {
    const resource = this.dataSource$();
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

      if (valueA instanceof Date && valueB instanceof Date) {
        const timeA = valueA.getTime();
        const timeB = valueB.getTime();
        return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
      }

      return 0;
    });
  });
}
