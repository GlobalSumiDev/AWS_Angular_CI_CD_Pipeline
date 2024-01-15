import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { BankandfinancialsComponent } from './bank-financials/bankandfinancials.component';
import { CareersComponent } from './careers/careers.component';
import { CloudservicesComponent } from './cloud-services/cloudservices.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EnergyandutilitiesComponent } from './energy-utilities/energyandutilities.component';
import { EtlanddataqualityComponent } from './etl-dataquality/etlanddataquality.component';
import { FullstackdevelopmentComponent } from './fullstack-development/fullstackdevelopment.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { HomeComponent } from './home/home.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { IotAndDigitalExperienceComponent } from './iot-and-digital-experience/iot-and-digital-experience.component';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { MobilityHospitalityComponent } from './mobility-hospitality/mobility-hospitality.component';
import { ProductComponent } from './product/product.component';
import { RetailComponent } from './retail/retail.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MediacommunicationComponent } from './mediacommunication/mediacommunication.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  CommonModule,
  RouterOutlet, 
  HeaderComponent, 
  FooterComponent,
  AboutComponent,
  BankandfinancialsComponent,
  CareersComponent,
  CloudservicesComponent,
  ContactusComponent,
  EnergyandutilitiesComponent,
  EtlanddataqualityComponent,
  FullstackdevelopmentComponent,
  HealthcareComponent,
  HomeComponent,
  InsuranceComponent,
  IotAndDigitalExperienceComponent,
  ManufacturingComponent,
  MobilityHospitalityComponent,
  MediacommunicationComponent,
  ProductComponent,
  RetailComponent,
  SidemenuComponent,
  NgbModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myapp';
}
