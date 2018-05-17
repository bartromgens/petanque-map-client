import { Component } from '@angular/core';

/**
 * Header component with bootstrap navbar.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isCollapsed = true;
}
