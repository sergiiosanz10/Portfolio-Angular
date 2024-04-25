import { Component } from '@angular/core';
import { CustomCursorComponent } from '../../../shared/components/custom-cursor/cursor-component';

@Component({
  selector: 'app-skills-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss'
})
export class ProjectsPageComponent {

  constructor(private customCursor: CustomCursorComponent) { }

  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }
}
