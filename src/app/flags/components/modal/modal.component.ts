import { Component, Input, OnInit } from '@angular/core';
import { Flags } from '../../interfaces/flags.interfaces';

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
}
