import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [RouterModule],
  template: `
    <button (click)="onClick()">
      <img src="../assets/iconburger.png" alt="iconburger" width="70px" />
    </button>
  `,
  styleUrl: './burger.component.css',
})
export default class BurgerComponent {
  state = inject(StateService);
  router = inject(Router);
  location = inject(Location);

  onClick() {
    if (this.router.url === '/menu') {
      this.location.back();
    } else {
      this.router.navigate(['/menu']);
    }
  }
}
