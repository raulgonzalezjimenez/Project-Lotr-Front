
import { Component, inject } from '@angular/core';
import { StateService } from '../../service/state.service';
import { account } from '../../models/user.data';
import { RepoUsersService } from '../../service/users.repo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  template: `
  <section >
    <p> Correo: {{ user?.email }}</p>
    <p>Nombre de Usuario: {{user?.userName }}</p>
    <img
    src="../assets/delete.png"
          alt="LogoDelete"
          width="30"
          height="30"
          (click)="userDelete()"
          (keyup)="userDelete()"
          tabindex="0"
    />
    <img
      src="../assets/update.png"
      alt="logoUpdate"
      width="40"
    />
  </section>
  `,
  styleUrls: ['./account.component.css'],
})
export default class AccountComponent {
  stateService = inject(StateService);
  repo = inject(RepoUsersService);
  user: account | null = null;
  router = inject(Router);

  constructor() {
    this.stateService.getState().subscribe((state) => {
      this.user = state.currenUser as account;
    });
  }

  userDelete() {
    if (!this.user || !this.user.id) return;

    this.repo.getDelete(this.user.id).subscribe(() => {
      this.stateService.setCharacters(
        this.stateService.state.characters.filter(
          (char) => char.id !== this.user!.id
        )
      );
      this.router.navigate(['/home']);
    });
  }
}

