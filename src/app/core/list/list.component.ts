import { Component, inject } from '@angular/core';
import { StateService } from '../../service/state.service';
import { Character, Race } from '../../models/character.data';
import RepoCharacterService from '../../service/character.service';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent],

  template: `<ul>
    @for (item of characters; track $index) {
    <li><app-card [character]="item" /></li>
    }
  </ul>`,
  styleUrl: './list.component.css',
})
export default class ListComponent {
  route = inject(ActivatedRoute);
  state = inject(StateService);
  repo = inject(RepoCharacterService);
  characters: Character[] = [];
  race: string | null;
  constructor() {
    this.race = this.route.snapshot.paramMap.get('data');
    this.state.getState().subscribe((data) => {
      this.characters = data.characters;
      console.log(this.characters);
    });
    this.getCharatacter();
  }

  getCharatacter() {
    if (this.race) {
      this.repo.filterCharacter(this.race as Race).subscribe({
        next: (data) => {
          this.characters = data;
          this.state.setCharacters(data);
        },
      });
    }
  }
}
