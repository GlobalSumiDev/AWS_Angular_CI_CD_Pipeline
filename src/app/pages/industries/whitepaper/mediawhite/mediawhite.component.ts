import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InnerbannerComponent } from '../../../../components/innerbanner/innerbanner.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mediawhite',
  standalone: true,
  imports: [SidebarComponent, CommonModule, InnerbannerComponent],
  templateUrl: './mediawhite.component.html',
  styleUrl: './mediawhite.component.scss'
})
export class MediawhiteComponent {
  isActive: boolean = false;

  @ViewChild('start') peoplewecare!: ElementRef;

  constructor(private route: ActivatedRoute) { }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      this.scrollToSection(fragment);
    });
  }
  scrollToSection(fragment: string | null): void {
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
