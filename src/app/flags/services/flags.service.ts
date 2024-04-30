import { Injectable } from '@angular/core';
import { Flags } from '../interfaces/flags.interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FlagsService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'https://restcountries.com/v3.1/all?fields=flags';


  getFlags():Observable<Flags[]>{
    const url = `${this.apiUrl}`
    return this.http.get<Flags[]>(url)
  }
}
