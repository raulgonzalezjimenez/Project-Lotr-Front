import { TestBed } from '@angular/core/testing';
import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { authInterceptor } from './logged.interceptor';
import { StateService } from '../../service/state.service';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  const req = {
    headers: {},
    clone: (options: { setHeaders: HttpHeaders }) => {
      req.headers = options.setHeaders;
      return req;
    },
  };
  const next = () => undefined;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            state: { loginState: 'logged', token: 'token' },
          },
        },
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if logged in', () => {
    interceptor(req as HttpRequest<unknown>, next as unknown as HttpHandlerFn);
    expect(req.headers).toEqual({
      Authorization: 'Bearer token',
    } as unknown as HttpHeaders);
  });

  it('should not add Authorization header if not logged in', () => {
    req.headers = {};
    TestBed.overrideProvider(StateService, {
      useValue: { state: { loginState: 'idle' } },
    });
    interceptor(req as HttpRequest<unknown>, next as unknown as HttpHandlerFn);
    expect(req.headers).toEqual({} as unknown as HttpHeaders);
  });
});
