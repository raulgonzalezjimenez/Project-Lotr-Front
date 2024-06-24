import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';
import RepoCharacterService from '../../service/character.service';

@Component({
  selector: 'app-createform',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="createform" (ngSubmit)="onSubmit()">
        <h2>Crear</h2>
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
        <button type="submit" [disabled]="createform.invalid">CREAR</button>
      </form>
    </section>
  `,
  styleUrl: './createform.component.scss',
})
export default class CreateformComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  state = inject(StateService);
  repo = inject(RepoCharacterService);
  raceOptions = ['men', 'elve', 'dwarf', 'urukhai', 'orc', 'hobbit'];
  @ViewChild('imgUrl') imgUrl!: ElementRef;

  createform: FormGroup = new FormGroup({
    race: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imgUrl: new FormControl([null]),
    faction: new FormControl('', Validators.required),
  });

  onSubmit() {
    const fd = new FormData();
    fd.append('race', this.createform.value.race);
    fd.append('name', this.createform.value.name);
    fd.append('description', this.createform.value.description);
    fd.append('imgUrl', this.createform.value.imgUrl);
    fd.append('faction', this.createform.value.faction);

    this.repo.createCharacter(fd).subscribe(() => {
      this.state.loadCharacter();
    });
  }

  onChangeImg() {
    const htmlElement: HTMLInputElement = this.imgUrl.nativeElement;
    const file = htmlElement.files![0];
    this.createform.patchValue({ imgUrl: file });
  }
}
