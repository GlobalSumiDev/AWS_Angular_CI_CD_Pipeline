import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CareersComponent } from './pages/careers/careers.component';
import { CareerapplicationComponent } from './pages/careerapplication/careerapplication.component';
import { InsuranceComponent } from './pages/industries/insurance/insurance.component';
import { BankfinancialComponent } from './pages/industries/bankfinancial/bankfinancial.component';
import { HealthcareComponent } from './pages/industries/healthcare/healthcare.component';
import { ManufacturingComponent } from './pages/industries/manufacturing/manufacturing.component';
import { RetailComponent } from './pages/industries/retail/retail.component';
import { EnergyutilitiesComponent } from './pages/industries/energyutilities/energyutilities.component';
import { MobilityhospitalityComponent } from './pages/industries/mobilityhospitality/mobilityhospitality.component';
import { MediacommunicationsComponent } from './pages/industries/mediacommunications/mediacommunications.component';
import { FullstackdevComponent } from './pages/services/fullstackdev/fullstackdev.component';
import { IotdigititalComponent } from './pages/services/iotdigitital/iotdigitital.component';
import { EtldataqualityComponent } from './pages/services/etldataquality/etldataquality.component';
import { CloudservicesComponent } from './pages/services/cloudservices/cloudservices.component';
import { DatascienceComponent } from './pages/services/datascience/datascience.component';
import { AnalyticsComponent } from './pages/services/analytics/analytics.component';
import { AutomationqualityComponent } from './pages/services/automationquality/automationquality.component';
import { AimlComponent } from './pages/services/aiml/aiml.component';
import { CybersecurityComponent } from './pages/services/cybersecurity/cybersecurity.component';
import { MedtechComponent } from './pages/products/medtech/medtech.component';
import { IrmsComponent } from './pages/products/irms/irms.component';
import { SearchbloxComponent } from './pages/products/searchblox/searchblox.component';
import { BankfinancialwhiteComponent } from './pages/industries/whitepaper/bankfinancialwhite/bankfinancialwhite.component';
import { InsurancewhiteComponent } from './pages/industries/whitepaper/insurancewhite/insurancewhite.component';
import { RetailwhiteComponent } from './pages/industries/whitepaper/retailwhite/retailwhite.component';
import { ManufacturingwhiteComponent } from './pages/industries/whitepaper/manufacturingwhite/manufacturingwhite.component';
import { HealthcarewhiteComponent } from './pages/industries/whitepaper/healthcarewhite/healthcarewhite.component';
import { EnergywhiteComponent } from './pages/industries/whitepaper/energywhite/energywhite.component';
import { MobilitywhiteComponent } from './pages/industries/whitepaper/mobilitywhite/mobilitywhite.component';
import { MediawhiteComponent } from './pages/industries/whitepaper/mediawhite/mediawhite.component';

export const routes: Routes = [

  { path: '', component: HomeComponent, title: "Sumitech" },
  { path: 'aboutus', component: AboutusComponent, title: "About Us - Sumitech" },
  { path: 'contactus', component: ContactusComponent, title: "Contact Us - Sumitech" },
  { path: 'careers', component: CareersComponent, title: "Careers - Sumitech" },
  { path: 'application/:id', component: CareerapplicationComponent, title: "Careers Application - Sumitech" },
  { path: 'bankfinancial', component: BankfinancialComponent, title: "Banking and Financials - Sumitech", },
  { path: 'insurance', component: InsuranceComponent, title: "Insurance - Sumitech" },
  { path: 'healthcare', component: HealthcareComponent, title: "Healthcare, Pharma and Life Science - Sumitech" },
  { path: 'manufacturing', component: ManufacturingComponent, title: "Manufacturing - Sumitech" },
  { path: 'retail', component: RetailComponent, title: "Retail - Sumitech" },
  { path: 'energyutilities', component: EnergyutilitiesComponent, title: "Energy and Utilities - Sumitech" },
  { path: 'mobility-hospitality', component: MobilityhospitalityComponent, title: "Mobility And Hospitality - Sumitech" },
  { path: 'media-communications', component: MediacommunicationsComponent, title: "Media And Communication - Sumitech" },
  { path: 'fullstackdevlopment', component: FullstackdevComponent, title: "Full Stack Development - Sumitech" },
  { path: 'iot-digitital-experience', component: IotdigititalComponent, title: "Internet Of Things Digital Experience - Sumitech" },
  { path: 'etl-data-quality', component: EtldataqualityComponent, title: "ETL and Data Quality - Sumitech" },
  { path: 'cloud-services', component: CloudservicesComponent, title: "Cloud Services - Sumitech" },
  { path: 'data-science', component: DatascienceComponent, title: "Data Science - Sumitech" },
  { path: 'analytics', component: AnalyticsComponent, title: "Analytics - Sumitech" },
  { path: 'automation-quality', component: AutomationqualityComponent, title: "Automation and Quality Engineering - Sumitech" },
  { path: 'ai-ml', component: AimlComponent, title: "AI and ML - Sumitech" },
  { path: 'cyber-security', component: CybersecurityComponent, title: "Cyber Security - Sumitech" },
  { path: 'medtech', component: MedtechComponent, title: "MedTechMD - Sumitech" },
  { path: 'irms', component: IrmsComponent, title: "IRMS - Sumitech" },
  { path: 'searchblox', component: SearchbloxComponent, title: "Searchblox - Sumitech" },
  { path: 'bankfinancial/whitepaper', component: BankfinancialwhiteComponent, title: "Banking and Financials - Sumitech" },
  { path: 'insurance/whitepaper', component: InsurancewhiteComponent, title: "Insurance Whitepaper - Sumitech" },
  { path: 'healthcare/whitepaper', component: HealthcarewhiteComponent, title: "Healthcare, Pharma and Life Science Whitepaper - Sumitech" },
  { path: 'manufacturing/whitepaper', component: ManufacturingwhiteComponent, title: "Manufacturing Whitepaper - Sumitech" },
  { path: 'retail/whitepaper', component: RetailwhiteComponent, title: "Retail Whitepaper - Sumitech" },
  { path: 'energyutilities/whitepaper', component: EnergywhiteComponent, title: "Energy and Utilities Whitepaper - Sumitech" },
  { path: 'mobility-hospitality/whitepaper', component: MobilitywhiteComponent, title: "Mobility And Hospitality Whitepaper - Sumitech" },
  { path: 'media-communications/whitepaper', component: MediawhiteComponent, title: "Media And Communication Whitepaper - Sumitech" },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
