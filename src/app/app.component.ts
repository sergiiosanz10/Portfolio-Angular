import { Component, SimpleChanges, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './shared/interfaces';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

}
