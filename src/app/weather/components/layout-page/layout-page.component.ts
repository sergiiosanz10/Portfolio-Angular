import { Component } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
  ]

  constructor(private weatherService: WeatherService){}

  get weather(): Weather | undefined{
    return this.weatherService.weatherList
  }

}
