import { Component } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';

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
