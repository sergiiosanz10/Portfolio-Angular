import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { MapsService } from '../../services/maps.service';
import { Province, Result } from '../../interfaces/maps-interface';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public comunidades: Province | undefined;
  public comunidadSelected?: string;
  public provinces: Province | undefined;

  constructor(private mapsService: MapsService){}

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.66, 40],
      zoom: 9,
    });
    this.getComunidades()
  }

  getComunidades(){
    this.mapsService.getComunidades()
      .subscribe(data => {
        this.comunidades = data
      });
  }

  getProvinces(){
    this.mapsService.getProvinces(this.comunidadSelected)
      .subscribe(data => {
        this.provinces = data
      });
  }

  setcomunidadSelected(comunidad: string): void {
    this.comunidadSelected = comunidad;
    console.log(this.comunidadSelected);

  }
}
