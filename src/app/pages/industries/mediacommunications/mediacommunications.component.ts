import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mediacommunications',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent, RouterLink],
  templateUrl: './mediacommunications.component.html',
  styleUrl: './mediacommunications.component.scss'
})
export class MediacommunicationsComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
