import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { State, StateService } from '../../service/state.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loggedGuard: CanActivateFn = (_route, _stateRoute) => {
  const stateSrv = inject(StateService);
  const state: State = stateSrv.state;

  if (state.loginState !== 'logged') {
    console.log('Guard block navigate: LoginState', state.loginState);
    return false;
  }

  return true;
};
