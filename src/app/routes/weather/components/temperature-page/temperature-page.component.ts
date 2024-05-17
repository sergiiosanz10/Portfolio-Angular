import { Component } from '@angular/core';
import { WeatherService } from '../../../../shared/services/weather.service';
import { Weather } from '../../../../shared/interfaces/weather.interface';


@Component({
  selector: 'temperature-page',
  templateUrl: './temperature-page.component.html',
  styleUrl: './temperature-page.component.scss'
})
export class TemperaturePageComponent {


  constructor(private weatherService:WeatherService){}
  get weather(): Weather | undefined{
    return this.weatherService.weatherList
  }



}
