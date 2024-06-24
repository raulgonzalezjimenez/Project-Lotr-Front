import { Component } from '@angular/core';
import BurgerComponent from '../../core/burger/burger.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BurgerComponent, RouterModule],
  template: `
    <header>
      <!-- <a href="#" [routerLink]="'/home'"
        ><img
          src="../assets/anillo.gif"
          width="55px"
          height="55px"
          alt="ring"
        />
      </a> -->
      <div>
        <a href="" routerLink="/home"
          ><img src="../assets/iconoanillo.png" alt=""
        /></a>
      </div>

      <app-burger></app-burger>
    </header>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
