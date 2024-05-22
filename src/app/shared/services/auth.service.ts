import { Injectable, computed, inject, signal } from '@angular/core';
import { environment_Taskify } from '../../../environments/Taskify-environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse, RegisterResponse } from '../interfaces';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment_Taskify.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthenticated(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', user._id);
    return true
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message)
        )
      )
  }

  register(name:  string, email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message)
        )
      )
  }


  isFieldOneEqualFieldTwo(field1: string, field2:string){

    return (formGroup: AbstractControl):ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {

        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true}
      }

      formGroup.get(field2)?.setErrors(null);
      return null;

    }


  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;

    return this.http.get<CheckTokenResponse>(url)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.noAuthenticated)
          return of(false)
        })
      )
  }

  logout(){
    sessionStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
    this.router.navigate(['/portfolio/projects/auth/login']);
  }


}
