import { Component, Input, OnInit } from '@angular/core';
import { ForeCast, List } from '../../interfaces/forecast.interface';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'weather-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input({ required: true }) forecast?: ForeCast;

  @Input({ required: true }) datelist?: List[];

  getDate(num: number) {

    let time = new Date(num * 1000);
    let today = new Date();

      if (time.getDate() === today.getDate()) {
        return 'Hoy'
      }

    return time
  }


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.weatherService.getForecastGeo(latitude, longitude)
          .subscribe(data => {
            this.forecast = data;
            this.weatherService.conseguirDatoForecast(data);
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
