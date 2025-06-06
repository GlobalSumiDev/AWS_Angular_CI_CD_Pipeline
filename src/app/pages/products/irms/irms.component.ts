import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-irms',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent, RouterLink],
  templateUrl: './irms.component.html',
  styleUrl: './irms.component.scss'
})
export class IrmsComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
