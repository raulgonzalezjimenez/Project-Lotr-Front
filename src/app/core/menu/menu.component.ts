import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <menu>
      <section>
        <button>MAPA</button>
        <a href="#" [routerLink]="'/races'"> <button>RAZAS</button></a>
        <button>HISTORIA</button>
        <button>FACCIONES</button>
        @if (displayLogout) {
        <button type="button" (click)="logout()">LOGOUT</button>
        <a  href="#" [routerLink]="'/account'"> <button class="account">CUENTA</button></a>
        } @else {
        <button class="login" [routerLink]="'/login'">LOGIN</button>
        }

      </section>
    </menu>
  `,
  styleUrl: './menu.component.css',
})
export default class MenuComponent {
  state = inject(StateService);
  router = inject(Router);
  displayLogout: boolean =
    this.state.getCurrentState().loginState === 'logged' ? true : false;

  logout() {
    this.state.setLogout();
    this.router.navigate(['/home']);
  }
}
