import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { ForeCast, List } from '../../interfaces/forecast.interface';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'weather-page',
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent implements OnInit{

  @Input() weathers: Weather | undefined;

  public capital:string = ''

  constructor(
    private weatherService:WeatherService,
    private activatedRoute: ActivatedRoute,
  ){}

  get weather(): Weather | undefined{
    return this.weatherService.weatherList
  }

  get forecast(): ForeCast | undefined{
    return this.weatherService.foreCastList
  }


  get datelist(): List[] | undefined{
    return this.weatherService.dateList
  }



  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( params => {
        this.capital = params['capital']
      })

  if(this.capital){
    return
  } else{

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.weatherService.getweatherGeo(latitude, longitude)
        .subscribe(data => {
          this.weathers=data;
          this.weatherService.conseguirDatos(data);
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

  if(time){
    const nigth = weatherData!.weather[0].icon;
    if(nigth === '01n'){
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
    }else if(weather === 'Snow'){
      return 'snow';
    }else {
      return 'clear';
    }
  } else {
    return 'clear';
  }


}

}
