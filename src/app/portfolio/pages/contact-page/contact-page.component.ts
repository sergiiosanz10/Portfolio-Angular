import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CustomCursorComponent } from '../../../shared/components/custom-cursor/cursor-component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

  constructor(private customCursor: CustomCursorComponent) { }

  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm('service_bbu0o6g', 'template_bf3ksfr', e.target as HTMLFormElement, {
        publicKey: 'rsQJ4VOdU8W3p53zn',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          location.reload();
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }


  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }

}
