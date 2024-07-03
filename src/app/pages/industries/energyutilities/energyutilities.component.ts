import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { InnerbannerComponent } from '../../../components/innerbanner/innerbanner.component';
import { RouterLink } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-energyutilities',
  standalone: true,
  imports: [SidebarComponent, InnerbannerComponent, RouterLink],
  templateUrl: './energyutilities.component.html',
  styleUrl: './energyutilities.component.scss'
})
export class EnergyutilitiesComponent {
  toggleActive() {
    $(".filter-icon").click(function () {
      $(".mobile-filter").toggleClass("open-filter");
    });
  }
}
