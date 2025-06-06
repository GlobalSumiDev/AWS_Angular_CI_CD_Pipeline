import { Component, ElementRef, ViewChild } from '@angular/core';
import { InnerbannerComponent } from '../../../../components/innerbanner/innerbanner.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insurancewhite',
  standalone: true,
  imports: [InnerbannerComponent, SidebarComponent, CommonModule],
  templateUrl: './insurancewhite.component.html',
  styleUrl: './insurancewhite.component.scss'
})
export class InsurancewhiteComponent {
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
