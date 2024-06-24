import { Component, Input, inject } from '@angular/core';
import { Character } from '../../models/character.data';
import { StateService } from '../../service/state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div>
      <img
        [routerLink]="['/details/', character.id]"
        src="{{ this.state.constructImageUrl(character.imgUrl, '100', '100') }}"
        alt="logoCard"
      />
    </div>
  `,
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() character!: Character;
  state = inject(StateService);
  constructor() {}
}
