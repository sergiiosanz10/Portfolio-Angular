import { Component } from '@angular/core';

import { CustomCursorComponent } from '../../../shared/components/custom-cursor/cursor-component';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  text: string = `Hello! My name is Sergio Sanz, and I am a passionate Front-end developer. I specialize in creating interactive, efficient, and sophisticated
                  web applications using the latest technologies and frameworks.
                  Over the years, I have honed my skills in HTML, CSS, JavaScript, and TypeScript. I have a solid experience with frameworks such as Angular,`


  constructor(private customCursor: CustomCursorComponent) { }

  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }
}
