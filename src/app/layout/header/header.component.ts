import { RouterOutlet, RouterLink, RouterLinkActive, NavigationStart } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  isActive: boolean = false;
  navbar: any;
  industries: boolean = false;
  services: boolean = false;
  products: boolean = false;

  isSticky: boolean = false;

  onScroll(event: any) {
    // You can adjust the threshold based on your needs
    if (window.pageYOffset > 100) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  // constructor(private router: Router) { }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 1024) {
      this.addClass();
      this.closeMenu();
      this.openIndustries();
      this.openServices();
      this.openProducts();
    }
  }
  addClass() {
    this.isActive = !this.isActive;
  }
  closeMenu() {
    this.isActive = false;
  }
  openIndustries() {
    this.industries = !this.industries;
  }
  openServices() {
    this.services = !this.services;
  }
  openProducts() {
    this.products = !this.products;
  }

}
