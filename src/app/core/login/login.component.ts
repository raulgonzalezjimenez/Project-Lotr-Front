import { Component, inject } from '@angular/core';
import { RepoUsersService } from '../../service/users.repo.service';
import { StateService } from '../../service/state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginDto } from '../../models/user.data';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,

  template: `
    <section>
      <form [formGroup]="formLogin" (ngSubmit)="submit()">
        <img src="../assets/imagenlogin.png" alt="logo login" />
        <h2>Login</h2>
        <div class="email">
          <input
            id="user"
            type="text"
            formControlName="user"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" [disabled]="formLogin.invalid">LOGIN</button>
        <div class="register">
          <p>¿No tienes cuenta?</p>
          <a href="#" [routerLink]="'/register'">Regístrate</a>
        </div>
      </form>
    </section>
  `,
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, FooterComponent, RouterModule],
})
export default class LoginComponent {
  private repoUser = inject(RepoUsersService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  router = inject(Router);
  formLogin = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });
  submit() {
    const { user, password } = this.formLogin.value;
    const userLogin = { password } as UserLoginDto;

    if (user!.includes('@')) {
      userLogin.email = this.formLogin.value.user as string;
    }

    this.repoUser.login(userLogin).subscribe({
      next: ({ token }) => {
        console.log(token)
        this.state.setLogin(token);
        console.log('Logged in', token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
      },
    });
  }
}
