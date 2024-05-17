import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../shared/interfaces/country.interfaces';
import { Region } from '../../../../shared/interfaces/region.type';
import { CountriesService } from '../../../../shared/services/countries.service';




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.scss'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }

  searchByRegion(region: Region): void {
    this.isLoading = true;

    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
