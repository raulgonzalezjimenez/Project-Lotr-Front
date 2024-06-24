import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<section></section> `,
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
