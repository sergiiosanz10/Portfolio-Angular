import { Component } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';

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
