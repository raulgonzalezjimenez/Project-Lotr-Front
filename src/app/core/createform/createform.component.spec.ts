import { ComponentFixture, TestBed } from '@angular/core/testing';

import CreateformComponent from './createform.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateformComponent', () => {
  let component: CreateformComponent;
  let fixture: ComponentFixture<CreateformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateformComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
