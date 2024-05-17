import { Component } from '@angular/core';
import { Weather } from '../../../../shared/interfaces/weather.interface';
import { WeatherService } from '../../../../shared/services/weather.service';


@Component({
  selector: 'weather-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent {

  public goodDay: string[] = [
    'Jugar a fútbol',
    'Hacer una barbacoa',
    'Hacer una excursión',
    'Hacer una ruta en bicicleta'
  ];

  public badDay: string[] = [
    'Quedarse en casa',
    'Ver una película',
    'Hacer una maratón de series',
    'Leer un libro',
  ];

  constructor(private weatherService: WeatherService) { }

  get weather(): Weather | undefined{
    return this.weatherService.weatherList
  }

  get recomendations(): string[] {
    if(this.weather){
      if(this.weather.clouds.all < 20){
        return this.goodDay;
      } else {
        return this.badDay;
      }
    }
    return [];
  }
}
