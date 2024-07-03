import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobilityhospitality',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent, RouterLink],
  templateUrl: './mobilityhospitality.component.html',
  styleUrl: './mobilityhospitality.component.scss'
})
export class MobilityhospitalityComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
