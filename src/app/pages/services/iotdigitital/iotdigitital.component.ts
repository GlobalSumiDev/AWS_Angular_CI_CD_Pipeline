import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';

@Component({
  selector: 'app-iotdigitital',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent],
  templateUrl: './iotdigitital.component.html',
  styleUrl: './iotdigitital.component.scss'
})
export class IotdigititalComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
