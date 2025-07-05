import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTable } from './components/data-table/data-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'data-table';
}
