import { Component } from '@angular/core';
import { WeatherService } from '../../../../shared/services/weather.service';
import { Weather } from '../../../../shared/interfaces/weather.interface';


@Component({
  selector: 'wind-page',
  templateUrl: './wind-page.component.html',
  styleUrl: './wind-page.component.scss'
})
export class WindPageComponent {


  constructor(private weatherService:WeatherService){}

  get weather(): Weather | undefined{
    return this.weatherService.weatherList
  }
}
