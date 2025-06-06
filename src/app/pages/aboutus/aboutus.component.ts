import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InnerbannerComponent } from '../../components/innerbanner/innerbanner.component';
@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [SlickCarouselModule, InnerbannerComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent implements AfterViewInit {
  @ViewChild('peoplewecare') peoplewecare!: ElementRef;

  e: any;

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
  peopleConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "arrows": true,
    "dots": false,
    "infinite": false,
    "speed": 500,
  };

  teamSlider = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "arrows": true,
    "dots": false,
    "infinite": false,
    "speed": 500,
    "responsive": [
      {
        " breakpoint": 1024,
        "settings": {
          "slidesToShow": 3,
          "arrows": false,
          "dots": true,
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "slidesToShow": 2,
          "arrows": false,
          "dots": true,
        }
      },
      {
        "breakpoint": 575,
        "settings": {
          "slidesToShow": 1,
          "arrows": false,
          "dots": true,
        }
      }
    ]
  }

}
