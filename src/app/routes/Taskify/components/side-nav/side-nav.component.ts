import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { DtoResponseGetUser } from '../../../../shared/interfaces/DtoResponseGetUser';


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  public admin: number = 0;


  ngOnInit(): void {
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
