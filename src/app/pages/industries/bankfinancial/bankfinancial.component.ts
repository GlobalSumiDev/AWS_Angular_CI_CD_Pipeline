import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
declare var $: any;
@Component({
  selector: 'app-bankfinancial',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterLink, InnerbannerComponent],
  templateUrl: './bankfinancial.component.html',
  styleUrl: './bankfinancial.component.scss'
})
export class BankfinancialComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
