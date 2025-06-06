import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';

@Component({
  selector: 'app-aiml',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent],
  templateUrl: './aiml.component.html',
  styleUrl: './aiml.component.scss'
})
export class AimlComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
