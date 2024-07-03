import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrolltop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrolltop.component.html',
  styleUrl: './scrolltop.component.scss'
})
export class ScrolltopComponent {
  isShow: boolean = false;
  topPosToStartShowing: number = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
