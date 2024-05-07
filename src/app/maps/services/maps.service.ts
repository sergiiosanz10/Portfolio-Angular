import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province, Result } from '../interfaces/maps-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  private ComuidadAutonomaUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-comunidad-autonoma/records?select=acom_name&limit=20';
  private provincesUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-spain-provincia/records?select=';

  getComunidades(): Observable<Province> {
    return this.http.get<Province>(`${this.ComuidadAutonomaUrl}`)
  }

  getProvinces(comunidad: string | undefined): Observable<Province>{
    return this.http.get<Province>(`${this.provincesUrl}${comunidad}&limit=50`)
  }
}
