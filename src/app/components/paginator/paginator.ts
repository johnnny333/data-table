import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  imports: [FormsModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  readonly totalPages$ = input.required<number>();
  readonly pageSize$ = model<number>();
  readonly currentPage$ = model.required<number>();

  protected prevPage() {
    this.currentPage$.update((p) => Math.max(1, p - 1));
  }

  protected nextPage() {
    this.currentPage$.update((p) => Math.min(this.totalPages$(), p + 1));
  }
}
