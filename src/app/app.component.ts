import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { StateService } from './service/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  onClick() {
    throw new Error('Method not implemented.');
  }
  state = inject(StateService);
  constructor() {
    const token = localStorage.getItem('LOTR');
    if (token) {
      this.state.setLogin(token);
    }
  }
}
