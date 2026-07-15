import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "./side-menu/side-menu";

@Component({
  selector: 'app-root',
  imports: [SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('planner-front');
}
