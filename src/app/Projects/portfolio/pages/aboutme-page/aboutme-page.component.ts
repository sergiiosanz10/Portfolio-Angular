import { Component } from '@angular/core';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';

@Component({
  selector: 'app-aboutme-page',
  templateUrl: './aboutme-page.component.html',
  styleUrl: './aboutme-page.component.scss'
})
export class AboutmePageComponent {
  text: string = `Hello! My name is Sergio Sanz, and I am a passionate Front-end developer. I specialize in creating interactive, efficient, and sophisticated web applications using the latest technologies and frameworks.

  Over the years, I have honed my skills in HTML, CSS, JavaScript, and TypeScript. I have a solid experience with frameworks such as Angular, and I'm also familiar with Bootstrap for user interface design. In addition, I have experience with CSS preprocessors like Sass.

  On the server side, I have experience with Node.js and PHP, and I'm comfortable using jQuery for DOM manipulations and effects. I'm also familiar with package handling with npm.

  I have worked on a variety of projects, from simple static websites to complex web applications. I enjoy the challenge of solving problems and creating solutions that not only meet the requirements but also provide a great user experience.

  In addition to my technical skills, I am a strong communicator and a team player. I believe that collaboration and clear communication are key to the success of any project.

  I'm always looking for new opportunities to apply my skills and contribute to exciting projects. If you're interested in working with me, please don't hesitate to get in touch!`;

  constructor(private customCursor: CustomCursorComponent) { }

  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }
}
