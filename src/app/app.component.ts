import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollToTopService } from './scroll-to-top.service';
import { ReactiveFormsModule } from '@angular/forms';
// import AOS from 'aos';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [ScrollToTopService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sumitech';
  constructor(private scrollToTopService: ScrollToTopService) { }

  ngOnInit(): void {
    this.scrollToTopService.scrollToTopOnRouteChange();

  }
}
