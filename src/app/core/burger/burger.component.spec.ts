import { ComponentFixture, TestBed } from '@angular/core/testing';
import BurgerComponent from './burger.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BurgerComponent', () => {
  let component: BurgerComponent;
  let fixture: ComponentFixture<BurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
