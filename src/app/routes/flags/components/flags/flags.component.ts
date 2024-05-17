import { Component, Input } from '@angular/core';
import { FlagsService } from '../../../../shared/services/flags.service';
import { Flags } from '../../../../shared/interfaces/country.interfaces';


@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.scss'
})
export class FlagsComponent {

  public flagsList: Flags[] = [];

  @Input()
  public currency?: string [];

  @Input()
  public flagSelected?: Flags


  constructor(private flagsService: FlagsService) { }

  ngOnInit(): void {
    this.flags();
  }

  flags(): void {
    this.flagsService.getFlags()
      .subscribe(flags => {
        this.flagsList = flags;
      });

  }


  setflagSelected(i: number): void {
    this.flagSelected = this.flagsList[i];
  }

}
