import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingSpinnerCountriesComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    CountryPageComponent,
    ByRegionPageComponent,
    CountryTableComponent,
    MainPageComponent,
    SearchBoxComponent,
    LoadingSpinnerCountriesComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,

  ],
})
export class CountriesModule { }
