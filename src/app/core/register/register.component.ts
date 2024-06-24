import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { RepoUsersService } from '../../service/users.repo.service';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `
    <section>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <img src="../assets/imagenlogin.png" alt="logo login" />
        <h2>Registro</h2>
        <div class="form-control">
          <input
            id="email"
            type="text"
            formControlName="email"
            placeholder="Email"
          />
        </div>
        <div class="form-control">
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="Password"
          />
        </div>
        <div class="form-control">
          <input
            id="username"
            type="text"
            formControlName="userName"
            placeholder="User Name"
          />
        </div>

        <button type="submit" [disabled]="registerForm.invalid">
          REGISTRAR
        </button>
        <div class="login">
          <p>¿Ya tienes cuenta?</p>
          <a href="#" [routerLink]="'/login'">Inicia sesión</a>
        </div>
      </form>
    </section>
  `,

  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  fb = inject(FormBuilder);
  repo = inject(RepoUsersService);
  router = inject(Router);
  state = inject(StateService);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
  });

  constructor() {}

  onSubmit() {
    const userData = this.registerForm.value;
    return this.repo.create(userData).subscribe(() => {
      this.state.setLoginState('logged');
      this.router.navigate(['/login']);
    });
  }
}
