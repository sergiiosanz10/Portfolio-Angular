import { Component } from '@angular/core';
import { CustomCursorComponent } from '../custom-cursor/cursor-component';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  constructor(private customCursor: CustomCursorComponent) {}


  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }


}
