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

public ngOnInit() {
  // Guarda una cookie con la fecha y hora actuales cuando el usuario entra a la página
  document.cookie = `lastEmailSentAt=${Date.now()}; path=/`;
}

public sendEmail(e: Event) {
  e.preventDefault();

  const now = Date.now();
  const lastEmailSentAt = this.getCookie('lastEmailSentAt');
  const timeSinceLastEmail = now - (lastEmailSentAt || 0);

  // Limita los correos electrónicos a uno cada 30 segundos
  if (timeSinceLastEmail < 30000) {
    console.log('Por favor, espera antes de enviar otro correo electrónico.');
    return;
  }

  // Actualiza la cookie con la fecha y hora actuales
  document.cookie = `lastEmailSentAt=${now}; path=/`;

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

private getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return Number(cookieValue);
  }
  return null;
}


  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }

}
