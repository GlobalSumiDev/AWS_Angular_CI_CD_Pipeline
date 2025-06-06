import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// declare var $: any;
// import jquery from 'jquery';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  // constructor(private el: ElementRef) { }

  servicesSliderConfig = {
    "arrows": true,
    "dots": false,
    "infinite": false,
    "speed": 500,
    "margin": 10,
    "slidesToShow": 3,
    'slidesToScroll': 1,
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 2
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "slidesToShow": 2,
          "arrows": false,
          'dots': true,
        }
      },
      {
        "breakpoint": 575,
        "settings": {
          "arrows": false,
          'dots': true,
          'slidesToShow': 1
        }
      }
    ]
  }

  industriesConfig = {
    "arrows": true,
    "dots": false,
    "infinite": false,
    "speed": 500,
    "slidesToShow": 5,
    "slidesToScroll": 2,
    "responsive": [
      {
        "breakpoint": 1110,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
        }
      },
      {
        "breakpoint": 575,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
        }
      }
    ]
  }

  ourClientConfig = {
    "arrows": false,
    "dots": true,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 3000,
  }
  ngAfterViewInit() {
    //Services Slider
    // $(this.el.nativeElement.querySelector('.services-slider')).slick({

    // });

    // $(this.el.nativeElement.querySelector('.industries-home')).slick({
    //   arrows: true,
    //   dots: false,
    //   infinite: false,
    //   speed: 500,
    //   slidesToShow: 5,
    //   slidesToScroll: 2,
    //   responsive: [
    //     {
    //       breakpoint: 1110,
    //       settings: {
    //         slidesToShow: 4
    //       }
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 2
    //       }
    //     },
    //     {
    //       breakpoint: 575,
    //       settings: {
    //         slidesToShow: 1
    //       }
    //     }
    //   ]
    // });
    // $(this.el.nativeElement.querySelector('.our-cllient')).slick({
    //   arrows: false,
    //   dots: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   autoplaySpeed: 3000,
    // });
  }
}
