import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Routes, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import RegisterComponent from './register.component';
import { RepoUsersService } from '../../service/users.repo.service';
import { StateService } from '../../service/state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRepoUsersService: jasmine.SpyObj<RepoUsersService>;
  let mockStateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    mockRepoUsersService = jasmine.createSpyObj('RepoUsersService', ['create']);

    mockStateService = jasmine.createSpyObj('StateService', ['setLoginState']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegisterComponent,
        HttpClientTestingModule,
      ],
      providers: [
        provideRouter([] as Routes),
        { provide: RepoUsersService, useValue: mockRepoUsersService },
        { provide: StateService, useValue: mockStateService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with empty fields', () => {
    expect(component.registerForm.get('email')?.value).toEqual('');
    expect(component.registerForm.get('password')?.value).toEqual('');
    expect(component.registerForm.get('userName')?.value).toEqual('');
  });

  it('should call onSubmit and create user when form is submitted', () => {
    const userData = {
      email: 'test@example.com',
      password: 'test123',
      userName: 'testuser',
    };
    const createUserSpy = mockRepoUsersService.create.and.returnValue(of({}));

    component.registerForm.setValue(userData);
    component.onSubmit();

    expect(createUserSpy).toHaveBeenCalledWith(userData);
    expect(mockStateService.setLoginState).toHaveBeenCalledWith('logged');
  });
});
