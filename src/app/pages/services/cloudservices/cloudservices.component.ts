import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';

@Component({
  selector: 'app-cloudservices',
  standalone: true,
  imports: [SidebarComponent, CommonModule, SlickCarouselModule, InnerbannerComponent],
  templateUrl: './cloudservices.component.html',
  styleUrl: './cloudservices.component.scss'
})
export class CloudservicesComponent {
  isActive: boolean = false;
  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  autoLoopingLogo = {
    "autoplay": true,
    "arrows": true,
    "slidesToShow": 4,
    "slidesToScroll": 2,
    "autoSlidesToShow": false,
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 2,
        }
      },
      {
        "breakpoint": 769,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
          "arrows": false,
          'dots': false,
          "autoplay": true,
          "speed": 2000
        }
      },
      {
        "breakpoint": 575,
        "settings": {
          "arrows": false,
          'slidesToShow': 2,
          "slidesToScroll": 2,
        }
      }
    ]
  }

}
