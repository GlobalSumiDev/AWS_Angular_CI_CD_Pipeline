import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';

@Component({
  selector: 'app-medtech',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent],
  templateUrl: './medtech.component.html',
  styleUrl: './medtech.component.scss'
})
export class MedtechComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  sourcePath = "https://www.medtechmd.com/index.html"
}
