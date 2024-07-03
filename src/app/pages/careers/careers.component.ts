import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InnerbannerComponent } from '../../components/innerbanner/innerbanner.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [InnerbannerComponent, CommonModule,RouterModule,],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {


  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
    ) { }
  careersData: any[] = [];
  navigateToApplication(careerItemId: number): void {
    console.log("careerItemId:", careerItemId);

    this.router.navigate(['/application', careerItemId]);
  }

  ngOnInit() {
    // Load JSON data using HttpClient
    this.http.get<any>('assets/data/careers-data.json').subscribe(data => {
      this.careersData = data.careers;
    });
  }
}
