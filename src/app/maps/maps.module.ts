import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1Ijoic2VyZ2lpb3NhbnoxMCIsImEiOiJjbHZ1bjFwdnExZ291MmpubjZhYWlqOGg3In0.iIhLLn5E4d7ZzD3sf_P5Sw';


import { MapsRoutingModule } from './maps-routing.module';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MapPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MapsModule { }
