import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserLoginDto, UserRegisterDto } from '../models/user.data';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RepoUsersService } from './users.repo.service';
describe('UsersRepoService', () => {
  let service: RepoUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())],
    });
    service = TestBed.inject(RepoUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('RepoUsersService', () => {
  let service: RepoUsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoUsersService],
    });
    service = TestBed.inject(RepoUsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request', () => {
    const testData: UserLoginDto = {
      password: 'testPassword',
    };
    const expectedResponse = { token: 'testToken' };

    service.login(testData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${service.url}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should send get by id request', () => {
    const userId = '123';
    const expectedResponse = { id: userId, username: 'testUser' };

    service.getById(userId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${service.url}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should send register request', () => {
    const testData: UserRegisterDto = {
      userName: 'testUser',
      password: 'testPassword',
      email: 'test@example.com',
    };

    service.create(testData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.url}/register`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
