import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manufacturing',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent, RouterLink],
  templateUrl: './manufacturing.component.html',
  styleUrl: './manufacturing.component.scss'
})
export class ManufacturingComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
