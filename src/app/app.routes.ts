import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BankandfinancialsComponent } from './bank-financials/bankandfinancials.component';
import { CareersComponent } from './careers/careers.component';
import { CloudservicesComponent } from './cloud-services/cloudservices.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EnergyandutilitiesComponent } from './energy-utilities/energyandutilities.component';
import { EtlanddataqualityComponent } from './etl-dataquality/etlanddataquality.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FullstackdevelopmentComponent } from './fullstack-development/fullstackdevelopment.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { IotAndDigitalExperienceComponent } from './iot-and-digital-experience/iot-and-digital-experience.component';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { MediaHospitalityComponent } from './media-hospitality/media-hospitality.component';
import { ProductComponent } from './product/product.component';
import { RetailComponent } from './retail/retail.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

export const routes: Routes = [
    { path:'home', component: HomeComponent },
    { path:'about', component: AboutComponent },
    { path: 'bankfinancials', component: BankandfinancialsComponent },
    { path: 'careers', component: CareersComponent },
    { path: 'cloudservices', component: CloudservicesComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'energyutilities', component: EnergyandutilitiesComponent },
    { path: 'etldataquality', component: EtlanddataqualityComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'fullstackdevelopment', component: FullstackdevelopmentComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'healthcare', component: HealthcareComponent },
    { path: 'home', component: HomeComponent },
    { path: 'insurance', component: InsuranceComponent },
    { path: 'iotdigitalexperience', component: IotAndDigitalExperienceComponent },
    { path: 'manufacturing', component: ManufacturingComponent },
    { path: 'mediahospitality', component: MediaHospitalityComponent },
    { path: 'product', component: ProductComponent },
    { path: 'retail', component: RetailComponent },
    { path: 'sidemenu', component: SidemenuComponent },
    { path: '**', redirectTo: 'home' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}