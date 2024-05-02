import { Component, Input, OnInit } from '@angular/core';
import { Flags } from '../../interfaces/flags.interfaces';
import { Languages } from '../../../countries/countries/interfaces/country.interfaces';

@Component({
  selector: 'flag-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input({ required: true })
  public flagSelected?: Flags;

  getCurrency() {
    if (this.flagSelected == undefined) {
      return;
    } else {
      let currencies = this.flagSelected.currencies;
      let currenciesKeys = currencies ? Object.keys(currencies) : [];
      let key = currenciesKeys[0];
      return (currencies as any)?.[`${key}`]
    }
  }

  getLanguage() {
    if (this.flagSelected == undefined) {
      return;
    } else {
      let languages = this.flagSelected.languages;
      let languagesKeys = languages ? Object.keys(languages) : [];
      let key = languagesKeys;

      let LanguagesMap = languagesKeys.map((key) => {
        return (languages as any)?.[`${key}`]
      })

      return LanguagesMap;
    }
  }
}
