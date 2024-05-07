import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { MapsService } from '../../services/maps.service';
import { GeoPoint2D, Province, Result } from '../../interfaces/maps-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public comunidades: Province | undefined;
  public provinces: Province | undefined;
  public municipios: Province | undefined;

  public myForm: FormGroup = this.fb.group({
    comunidad: ['', Validators.required],
    provincia: ['', Validators.required],
    municipio: ['', Validators.required],
  });


  constructor(
    private mapsService: MapsService,
    private fb: FormBuilder
  ) { }

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.66, 40],
      zoom: 9,
    });
    this.map.on('load', () => {
      this.getComunidades();
      this.getProvinces();
      this.getMunicipios();
    });
  }

  getComunidades() {
    this.mapsService.getComunidades()
      .subscribe(data => {
        this.comunidades = data
      });
  }

  getProvinces() {
    this.myForm.get('comunidad')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('provincia')!.setValue('')),
        switchMap(comunidad => this.mapsService.getProvinces(comunidad))
      )
      .subscribe(data => {
        this.provinces = data;
        console.log(this.provinces);
      });
  }

  getMunicipios() {
    this.myForm.get('provincia')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('municipio')!.setValue('')),
        switchMap(provincia => this.mapsService.getMunicipios(provincia))
      )
      .subscribe(data => {
        this.municipios = data;
      });

    this.myForm.get('municipio')!.valueChanges
      .subscribe(municipio => {
        this.flyTo(municipio);
      });
  }

  flyTo(municipio: string) {
    const selectedMunicipio = this.municipios?.results.find(m => m.mun_name === municipio);
    if (this.map && selectedMunicipio?.geo_point_2d) {

      this.map.flyTo({
        center: [selectedMunicipio.geo_point_2d.lon, selectedMunicipio.geo_point_2d.lat],
        zoom: 14
      });

      new Marker({
        color: 'red',
        draggable: true
      })
        .setLngLat([selectedMunicipio.geo_point_2d.lon, selectedMunicipio.geo_point_2d.lat])
        .addTo(this.map);
    }
  }
}
