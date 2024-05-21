import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { AuthService } from '../../../../../shared/services/auth.service';
import { AuthStatus } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router)

  public Auth: string = '';

  public myForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  public finishedAuthCheck = computed<boolean>( () => {

    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect( () => {
    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        this.Auth = AuthStatus.checking;
        return;
      case AuthStatus.authenticated:
        this.Auth = AuthStatus.authenticated;
        this.router.navigateByUrl('/portfolio/projects/dashboard');
        return;
      case AuthStatus.noAuthenticated:
        this.Auth = AuthStatus.noAuthenticated;
        this.router.navigateByUrl('/portfolio/projects/auth/login');
        return;
    }
  });

  constructor(){
    console.log(this.Auth);

  }

  login(){

    const {email, password} = this.myForm.value;
    this.authService.login(email, password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/portfolio/projects/dashboard'),
        error: (message) => {

          Swal.fire('Error', message, 'error')

        }

      })
  }



}
