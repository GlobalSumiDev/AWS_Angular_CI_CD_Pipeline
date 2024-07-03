import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-innerbanner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './innerbanner.component.html',
  styleUrl: './innerbanner.component.scss'
})
export class InnerbannerComponent {

  @Input() subTitle: string | undefined;
  @Input() heading: string | undefined;
  @Input() btnText: string | undefined;
  @Input() backgroundUrl: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Remove fragment after 2 seconds
      setTimeout(() => {
        this.removeFragment();
      }, 2000);
    });
  }

  removeFragment() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('#')) {
      const urlWithoutFragment = currentUrl.split('#')[0];
      window.history.replaceState({}, '', urlWithoutFragment);
    }
  }
}
