import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from '../navmenu/navmenu.component';

@Component({
  selector: 'app-root',
  imports: [NavMenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
