import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { DtoResponseGetUser } from '../../../../shared/interfaces/DtoResponseGetUser';


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  public admin: number = 0;


  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    const body = document.body;
    const toggle = document.getElementById('toggle') as HTMLInputElement;
    if (theme) {
      body.classList.add(theme);
      if (theme === 'dark-mode') {
        toggle.checked = true;
      } else {
        toggle.checked = false;
      }
    } else {
      body.classList.add('light-mode');
      toggle.checked = false;
    }

    this.userById()
  }

  onLogout() {
    this.authService.logout()
  }

  userById() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.getUserByToken(token)
      .subscribe(
        (admin: DtoResponseGetUser) => this.admin = admin.user.admin);
  }
}
