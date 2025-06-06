import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  subMenuItems = [
    { label: 'Banking and Financials', link: '/bankfinancial' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' }
    // Add more menu items as needed
  ];
}
