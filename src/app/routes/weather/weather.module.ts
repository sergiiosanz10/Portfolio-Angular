import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module'


import { MainPageComponent } from './pages/main-page.component';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { WindPageComponent } from './components/wind-cloud-page/wind-page.component';
import { TemperaturePageComponent } from './components/temperature-page/temperature-page.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';
import { GraphicPageComponent } from './components/graphic-page/graphic-page.component';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';

registerLocaleData(es);


@NgModule({
  declarations: [
    MainPageComponent,
    LayoutPageComponent,
    WeatherPageComponent,
    WindPageComponent,
    TemperaturePageComponent,
    SearchComponent,
    CardComponent,
    RecomendationsComponent,
    GraphicPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxChartsModule,
    WeatherRoutingModule,
    SharedModule
  ],
  exports: [
    MainPageComponent
  ],
  providers: [
    {
    provide: LOCALE_ID, useValue: 'es',
    }
  ]
})
export class WeatherModule { }
