import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTable } from './components/data-table/data-table';
import { ResourceHttp } from './services/resource-http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly resourceHttp = inject(ResourceHttp);

  /* Various data types to test */
  protected usersResource = this.resourceHttp.usersResource;
  protected productsResource = this.resourceHttp.productsResource;
}
