import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CustomCursorComponent } from '../../../shared/components/custom-cursor/cursor-component';
import { environment } from './../../../../environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {


  constructor(
    private customCursor: CustomCursorComponent,
    private _snackBar: MatSnackBar
  ) { }


  public ngOnInit() {
    // Solo establece la cookie si no existe
    if (!this.getCookie('lastEmailSentAt')) {
      document.cookie = `lastEmailSentAt=${Date.now()}; path=/`;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['my-snackbar'],
    });
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const now = Date.now();
    const lastEmailSentAt = this.getCookie('lastEmailSentAt');
    const timeSinceLastEmail = now - (lastEmailSentAt || 0);

    // Limita los correos electrónicos a uno cada 30 segundos
    if (timeSinceLastEmail < 30000) {
      console.log('Por favor, espera antes de enviar otro correo electrónico.');
      this.openSnackBar('ERROR al enviar el correo!!', 'Cerrar');
      return;
    }

    // Actualiza la cookie con la fecha y hora actuales
    document.cookie = `lastEmailSentAt=${now}; path=/`;

    emailjs
      .sendForm('service_bbu0o6g', 'template_bf3ksfr', e.target as HTMLFormElement, {
        publicKey: environment.apiKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          this.openSnackBar('Correo enviado con exito!!', 'Cerrar');
          form.reset();
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
