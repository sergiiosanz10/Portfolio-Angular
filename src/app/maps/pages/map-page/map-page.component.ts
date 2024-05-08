import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, Popup } from 'mapbox-gl';
import { MapsService } from '../../services/maps.service';
import { GeoPoint2D, Province, Result } from '../../interfaces/maps-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe, switchMap, tap } from 'rxjs';

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
  public marker: Marker | undefined;
  public selectedMunicipio: Result | undefined;
  public weather: string | undefined

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
        console.log(this.municipios);

      });

    this.myForm.get('municipio')!.valueChanges
      .subscribe(municipio => {
        this.flyTo(municipio);
      });
  }

  flyTo(municipio: string) {
    this.selectedMunicipio = this.municipios?.results.find(m => m.mun_name === municipio);

    if (this.selectedMunicipio == undefined) return;
    if (this.map && this.selectedMunicipio.geo_point_2d) {

      this.map.flyTo({
        center: [this.selectedMunicipio.geo_point_2d.lon, this.selectedMunicipio.geo_point_2d.lat],
        zoom: 14
      });

      this.marker = new Marker({
        color: 'red',
      })
      this.marker.setLngLat([this.selectedMunicipio.geo_point_2d.lon, this.selectedMunicipio.geo_point_2d.lat]).addTo(this.map);

      this.municipioWeather()
      this.mapsService.getweather(this.selectedMunicipio.geo_point_2d.lon, this.selectedMunicipio.geo_point_2d.lat)
    }
  }

  municipioWeather() {
    //Div y boton para redirigir a weather
    this.marker?.getElement().addEventListener("click", () => {
      console.log("HILI");
    })
    let popup = new Popup()
    let div = document.createElement("div");
    let bnt = document.createElement("a");
    div.classList.add('div_btn');
    bnt.innerText = "Tiempo";
    bnt.classList.add("btn_weather");

    bnt.setAttribute("href", `/portfolio/projects/weather/${this.selectedMunicipio?.mun_name}`);
    div.appendChild(bnt);

    popup.setDOMContent(div);
    this.marker?.setPopup(popup);
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {

    if (!this.map) return;

    this.marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.marker.on('dragend', () => console.log(this.marker));
    this.weatherMarker(lngLat)

  }

  weatherMarker(lngLat: LngLat) {

    this.mapsService.getweather(lngLat.lat, lngLat.lng)
      .subscribe(({ name }) => {
        this.weather = name;

        this.mapsService.getWeatherMunicipio(name)
          .subscribe(data => {
            this.myForm.get('comunidad')?.setValue(data.results[0].acom_name),
            this.myForm.get('provincia')!.setValue(data.results[0].prov_name)
            this.myForm.get('municipio')!.setValue(data.results[0].mun_name),
            this.selectedMunicipio = data.results[0]
            this.municipioWeather()
          }
          )
      });

  }
}
