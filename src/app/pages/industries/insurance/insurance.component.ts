import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent, RouterLink],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
