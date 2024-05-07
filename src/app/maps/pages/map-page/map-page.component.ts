import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.66, 40],
      zoom: 9,
    });
  }
}
