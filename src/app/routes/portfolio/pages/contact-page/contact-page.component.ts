import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { environment } from '../../../../../environments/environment.development';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {

  public isLoading: boolean = false;

  constructor(
    private customCursor: CustomCursorComponent,
    private _snackBar: MatSnackBar
  ) { }



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
      this.openSnackBar('ERROR al enviar el correo, intentelo mas tarde!!', 'Cerrar');
      return;
    }

    // Actualiza la cookie con la fecha y hora actuales
    document.cookie = `lastEmailSentAt=${now}; path=/`;
this.isLoading = true;

    setTimeout(() => {

      emailjs
        .sendForm('service_bbu0o6g', 'template_bf3ksfr', e.target as HTMLFormElement, {
          publicKey: environment.apiKey,
        })
        .then(
          () => {
            console.log('SUCCESS!');
            document.cookie = `lastEmailSentAt=${Date.now()}; path=/`;
            this.openSnackBar('Correo enviado con exito!!', 'Cerrar');
            this.isLoading = false;
            form.reset();
          },
          (error) => {
            console.log('FAILED...', (error as EmailJSResponseStatus).text);
            this.isLoading = false;

          },
        );
    }, 1000);
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
