import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StateService } from './service/state.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: StateService;

  const mockStateService = jasmine.createSpyObj('StateService', {
    getState: of({ loginState: 'logged' }),
    setLogin: undefined,
  });

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'valid token' })
    );
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        {
          provide: StateService,
          useValue: mockStateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should check localStorage for a possible token and use it`, () => {
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(service.setLogin).toHaveBeenCalledWith('{"token":"valid token"}');
  });
});
