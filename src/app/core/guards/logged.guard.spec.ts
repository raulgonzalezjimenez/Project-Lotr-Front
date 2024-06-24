import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

import { loggedGuard } from './logged.guard';
import { StateService } from '../../service/state.service';

describe('loggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            state: {
              loginState: 'logged',
            },
          },
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when loginState is "logged"', () => {
    expect(
      executeGuard(
        null as unknown as ActivatedRouteSnapshot,
        null as unknown as RouterStateSnapshot
      )
    ).toBeTrue();
  });

  it('should return false when loginState is not "logged"', () => {
    TestBed.overrideProvider(StateService, {
      useValue: {
        state: {
          loginState: 'idle',
        },
      },
    });

    expect(
      executeGuard(
        null as unknown as ActivatedRouteSnapshot,
        null as unknown as RouterStateSnapshot
      )
    ).toBeFalse();
  });
});
