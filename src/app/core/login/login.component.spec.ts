import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, provideRouter } from '@angular/router';
import LoginComponent from './login.component';
import { of, throwError } from 'rxjs';
import { RepoUsersService } from '../../service/users.repo.service';
import { StateService } from '../../service/state.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockRepoUserService: jasmine.SpyObj<RepoUsersService>;
  let mockStateService: jasmine.SpyObj<StateService>;
  let router: Router;

  beforeEach(async () => {
    mockRepoUserService = jasmine.createSpyObj('RepoUsersService', ['login']);
    mockStateService = jasmine.createSpyObj('StateService', [
      'setLogin',
      'setLoginState',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        provideRouter([]),
        { provide: RepoUsersService, useValue: mockRepoUserService },
        { provide: StateService, useValue: mockStateService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on form submission', () => {
    const loginSpy = spyOn(component, 'submit').and.callThrough();
    const form = component.formLogin;
    form.setValue({
      user: 'test@test.com',
      password: 'password',
    });
    fixture.detectChanges();
    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should call repoUserService login method with correct user data', () => {
    const user = 'test@test.com';
    const password = 'password';
    const form = component.formLogin;
    const token = 'mockToken';
    mockRepoUserService.login.and.returnValue(of({ token: token }));
    form.setValue({
      user: user,
      password: password,
    });
    fixture.detectChanges();
    component.submit();
    expect(mockRepoUserService.login).toHaveBeenCalledWith({
      email: user,
      password: password,
    });
  });

  it('should navigate to home on successful login', () => {
    const token = 'mockToken';
    mockRepoUserService.login.and.returnValue(of({ token: token }));
    const user = 'test@test.com';
    const password = 'password';
    const form = component.formLogin;
    form.setValue({
      user: user,
      password: password,
    });
    fixture.detectChanges();
    component.submit();
    expect(mockStateService.setLogin).toHaveBeenCalledWith(token);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set login state to error on login error', () => {
    const error = 'Mock error';
    mockRepoUserService.login.and.returnValue(throwError(error));
    const user = 'test@test.com';
    const password = 'password';
    const form = component.formLogin;
    form.setValue({
      user: user,
      password: password,
    });
    fixture.detectChanges();
    component.submit();
    expect(mockStateService.setLoginState).toHaveBeenCalledWith('error');
  });
});
