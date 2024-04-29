import { Component, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { City, ForeCast } from '../../interfaces/forecast.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CityAutocomplete } from '../../interfaces/city.interface';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  // Variables privadas
  weather: Weather | undefined;
  forecast: ForeCast | undefined;
  history: City[] | undefined = [];

  city: CityAutocomplete[] = [];
  selectedCity?: CityAutocomplete;



  // Variables publicas
  public value: string = '';
  public search: FormControl<string | null> = new FormControl('');

  constructor(private weatherService: WeatherService, private _snackBar: MatSnackBar) { }


  // Lifecylce



  ngOnInit() {
    this.history = this.weatherService.tagsHistory;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  changeSpace() {
    this.search.setValue(this.search.value!.replace(' ', ', '));
  }

  //Autocompletado

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {

    if (!event.option.value) {
      this.selectedCity = undefined;
      return;
    }

    const city: CityAutocomplete = event.option.value;
    this.search.setValue(city.name);

    this.selectedCity = city;

  }

  autoComplete() {
    const value: string = this.search.value || '';

    this.weatherService.getSuggestions(value)
      .subscribe(city => this.city = city);
  }
  //##########################


  searchCity() {

    if (this.search.value === "") {

      this.openSnackBar('Introduce una ciudad valida!!', 'Cerrar');


    } else

      this.changeSpace();

    const city: City = { name: this.search.value!, country: this.selectedCity!.country};
    this.weatherService.organizeHistory(city);

    this.weatherService.getweather(this.search.value!, this.selectedCity!.country)
      .subscribe(data => {
        this.weather = data;
        console.log(data);

        this.weatherService.conseguirDatos(data);

      });

    //CONSEGUIR DATOS DE LOS 7 DIAS
    this.weatherService.getForecast(this.search.value!, this.selectedCity!.country)
      .subscribe(data => {
        this.forecast = data;
        this.weatherService.conseguirDatoForecast(data);
      });

    this.search.setValue('');

  }

  searchTagCity(tag: City) {

    //Convierto tag a string
    const cityString = JSON.stringify(tag);
    //Convierto el string a un objeto
    const cityObject = JSON.parse(cityString);
    //Accedo a las propiedades de los objetos
    const city = cityObject.name;
    const country = cityObject.country;

    this.weatherService.getweather(city, country)
      .subscribe(data => {
        this.weather = data;
        this.weatherService.conseguirDatos(data);
      });

    //CONSEGUIR DATOS DE LOS 7 DIAS
    this.weatherService.getForecast(city, country)
      .subscribe(data => {
        this.forecast = data;
        this.weatherService.conseguirDatoForecast(data);
      });

  }

  deleteTagCity(tag: City) {
    this.weatherService.deleteTag(tag);
  }



  get getHistory() {
    return this.weatherService.tagsHistory;
  }
}
