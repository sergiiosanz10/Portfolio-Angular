import { Component } from '@angular/core';
import { FlagsService } from '../../services/flags.service';
import { Flags, Name } from '../../interfaces/flags.interfaces';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.scss'
})
export class FlagsComponent {

  public flagsList: Flags[] = [];

  constructor(private flagsService: FlagsService) { }

  ngOnInit(): void {
    this.flags();
  }

  flags(): void {
    this.flagsService.getFlags()
      .subscribe(flags => {
        console.log(flags);

        this.flagsList = flags;
      });
  }
}
