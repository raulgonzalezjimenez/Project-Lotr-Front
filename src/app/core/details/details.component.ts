import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';
import { Character } from '../../models/character.data';
import { CardComponent } from '../card/card.component';
import RepoCharacterService from '../../service/character.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  template: `
    @if (character && !showUpdateForm) {
    <div class="fondo">
      <div class="top">
        <div class="left">
          <p>Nombre: {{ character.name }}</p>
          <p>Raza: {{ character.race }}</p>
        </div>
        <div class="right">
          <img
            src="{{
              this.state.constructImageUrl(character.imgUrl, '100', '100')
            }}"
            alt="logoCard"
          />
        </div>
      </div>
      <div class="bottom">
        <p>Descripcion:</p>
        <p>{{ character.description }}</p>
      </div>
      <div class="actions">
        <img
          src="../assets/update.png"
          alt="logoUpdate"
          width="40"
          (click)="toggleUpdateForm()"
          (keyup)="toggleUpdateForm()"
          tabindex="0"
        />

        <img
          src="../assets/delete.png"
          alt="LogoDelete"
          width="30"
          height="30"
          (click)="deleteCharacter()"
          (keyup)="deleteCharacter()"
          tabindex="0"
        />
      </div>
    </div>

    }
    <!-- <section>

      </section> -->

    @if (showUpdateForm) {
    <section>
      <form [formGroup]="updateForm" (ngSubmit)="updateCharacter()">
        <h2>Editar</h2>
        <div class="form-control">
          <select name="create" formControlName="race" id="race">
            <option value="" disabled>Elige la raza</option>
            @for (item of raceOptions; track $index) {
            <option value="{{ item }}">{{ item }}</option>
            }
          </select>
        </div>
        <div class="form-control">
          <input
            id="name"
            type="text"
            formControlName="name"
            placeholder="Nombre del personaje"
          />
        </div>
        <div class="form-control">
          <input
            id="description"
            type="text"
            formControlName="description"
            placeholder="Descripción"
          />
        </div>
        <div class="form-control">
          <input
            id="faction"
            type="text"
            formControlName="faction"
            placeholder="Facción"
          />
        </div>
        <label for="file">Selecciona tu imagen</label>
        <input type="file" class="file" #imgUrl (change)="onChangeImg()" />
        <button type="submit">EDITAR</button>
      </form>
    </section>
    }
  `,
  styleUrl: './details.component.css',
  imports: [RouterModule, CardComponent, ReactiveFormsModule],
})
export default class DetailsComponent {
  route = inject(ActivatedRoute);
  repo = inject(RepoCharacterService);
  state = inject(StateService);
  router = inject(Router);
  fb = inject(FormBuilder);
  raceOptions = ['men', 'elve', 'dwarf', 'urukhai', 'orc', 'hobbit'];
  @ViewChild('imgUrl') imgUrl!: ElementRef;

  character!: Character | undefined;
  showUpdateForm = false;
  updateForm: FormGroup;

  constructor() {
    this.updateForm = this.fb.group({
      name: [''],
      race: [''],
      description: [''],
      imgUrl: [''],
    });

    const characterId = this.route.snapshot.paramMap.get('id');
    this.state.getState().subscribe((data) => {
      console.log(data);
      this.character = data.characters.find(
        (character) => character.id === characterId
      );
      console.log(this.character);
    });
  }

  deleteCharacter() {
    if (!this.character) return;

    this.repo.getDelete(this.character.id).subscribe(() => {
      this.state.setCharacters(
        this.state.state.characters.filter(
          (char) => char.id !== this.character!.id
        )
      );
      this.router.navigate(['/races']);
    });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }
  updateCharacter() {
    if (!this.character) return;

    const updatedData = new FormData();
    updatedData.append('name', this.updateForm.value.name);
    updatedData.append('race', this.updateForm.value.race);
    updatedData.append('description', this.updateForm.value.description);
    updatedData.append('imgUrl', this.updateForm.value.imgUrl);
    updatedData.append('faction', this.updateForm.value.faction);

    this.repo
      .updateCharacter(this.character.id, updatedData)
      .subscribe((updatedCharacter) => {
        const updatedCharacters = this.state.state.characters.map((char) =>
          char.id === this.character!.id ? updatedCharacter : char
        );
        this.state.setCharacters(updatedCharacters);
        this.showUpdateForm = false;
      });
  }

  onChangeImg() {
    const htmlElement: HTMLInputElement = this.imgUrl.nativeElement;
    const file = htmlElement.files![0];
    this.updateForm.patchValue({ imgUrl: file });
  }
}
