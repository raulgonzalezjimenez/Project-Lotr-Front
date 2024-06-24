import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="races">
      @for (race of races; track $index) {
      <div class="{{ race.title }}">
        <button type="submit" [routerLink]="['/races', race.path]">
          {{ race.title }}
        </button>
      </div>
      }
      <div class="create">
        <button type="submit" [routerLink]="'/create'">
          Crea tu personaje
        </button>
      </div>
    </div>
  `,
  styleUrl: './races.component.css',
})
export default class RacesComponent {
  state = inject(StateService);

  races = [
    { path: 'men', title: 'hombre' },
    { path: 'elve', title: 'elfo' },
    { path: 'dwarf', title: 'enano' },
    { path: 'urukhai', title: 'urukhai' },
    { path: 'orc', title: 'orco' },
    { path: 'hobbit', title: 'hobbit' },
  ];
}
