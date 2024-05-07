import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province } from '../interfaces/maps-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  private ComuidadAutonomaUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-comunidad-autonoma/records?select=acom_name&limit=20';
  private provincesUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-provincia/records?select=prov_name&limit=100&refine=acom_name%3A';
  private municipiosUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-municipio/records?select=mun_name,geo_point_2d&limit=100&refine=prov_name%3A';

  getComunidades(): Observable<Province> {
    return this.http.get<Province>(`${this.ComuidadAutonomaUrl}`)
  }

  getProvinces(comunidad: Province | undefined): Observable<Province>{
    return this.http.get<Province>(`${this.provincesUrl}${comunidad}`)
  }

  getMunicipios(municipio: Province | undefined): Observable<Province>{
    return this.http.get<Province>(`${this.municipiosUrl}${municipio}`)
  }
}
