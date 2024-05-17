import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province } from '../interfaces/maps-interface';
import { Observable } from 'rxjs';
import { Weather } from '../interfaces/weather.interface';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  private weatherapiKey: string = '&appid=1f9ccab4cdafe0e22916708e85513df9';

  private ComuidadAutonomaUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-comunidad-autonoma/records?select=acom_name&limit=20';
  private provincesUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-provincia/records?select=prov_name&limit=100&refine=acom_name%3A';
  private municipiosUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-municipio/records?select=prov_name,acom_name,mun_name,geo_point_2d&limit=100&refine=prov_name%3A';
  private weatherMunicipiosUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-municipio/records?select=geo_point_2d,mun_name,acom_name,prov_name&where=mun_name=%27'
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

  getComunidades(): Observable<Province> {
    return this.http.get<Province>(`${this.ComuidadAutonomaUrl}`)
  }

  getProvinces(comunidad: Province | undefined): Observable<Province> {
    return this.http.get<Province>(`${this.provincesUrl}${comunidad}`)
  }

  getMunicipios(municipio: Province | undefined): Observable<Province> {
    return this.http.get<Province>(`${this.municipiosUrl}${municipio}`)
  }

  getWeatherMunicipio(municipio: string): Observable<Province> {
    return this.http.get<Province>(`${this.weatherMunicipiosUrl}${municipio}%27&limit=100`)
  }

  getweather(lat: number, long: number): Observable<Weather> {
    console.log(lat, long);
    return this.http.get<Weather>(`${this.weatherUrl}lat=${lat}&lon=${long}${this.weatherapiKey}&units=metric`);

  }
}
