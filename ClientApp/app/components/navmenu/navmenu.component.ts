import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css',
})
export class NavMenuComponent {}
