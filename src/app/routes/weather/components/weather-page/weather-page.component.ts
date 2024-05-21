import { Component, Input, OnInit, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../../../shared/services/weather.service';
import { Weather } from '../../../../shared/interfaces/weather.interface';
import { ForeCast, List } from '../../../../shared/interfaces/forecast.interface';


@Component({
  selector: 'weather-page',
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent implements OnInit {

  @Input() weathers: Weather | undefined;

  public capital: string = '';

  public isLoading = signal<boolean>(true)

  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute,
  ) { }

  get weather(): Weather | undefined {
    return this.weatherService.weatherList
  }

  get forecast(): ForeCast | undefined {
    return this.weatherService.foreCastList
  }


  get datelist(): List[] | undefined {
    return this.weatherService.dateList
  }



  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(params => {
        this.capital = params['capital'];
        this.isLoading.set(false);
      })

    if (this.capital) {
      return
    } else {
      this.isLoading.set(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.weatherService.getweatherGeo(latitude, longitude)
            .subscribe(data => {
              this.weathers = data;
              this.weatherService.conseguirDatos(data);
              this.isLoading.set(false);
            });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

  }

  //Fondo segun el tiempo
  get weatherBg(): string {
    const weatherData = this.weatherService.weatherList;
    const time = this.weatherService.weatherList?.weather[0].icon;

    if (time) {
      const nigth = weatherData!.weather[0].icon;
      if (nigth === '01n') {
        return 'night';
      }
    }

    if (weatherData) {
      const weather = weatherData.weather[0].main;
      if (weather === 'Clear') {
        return 'clear';
      } else if (weather === 'Clouds') {
        return 'clouds';
      } else if (weather === 'Rain' || weather === 'Drizzle') {
        return 'rain';
      } else if (weather === 'Snow') {
        return 'snow';
      } else {
        return 'clear';
      }
    } else {
      return 'clear';
    }


  }

}
