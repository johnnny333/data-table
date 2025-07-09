import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTable } from './components/data-table/data-table';
import { UsersHttp } from './services/users-http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected usersResource = inject(UsersHttp).usersResource
}
