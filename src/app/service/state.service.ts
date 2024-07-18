// import { Injectable, inject } from '@angular/core';
// import { RepoUsersService } from './users.repo.service';
// import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { BehaviorSubject, Observable } from 'rxjs';
// import RepoCharacterService from './character.service';
// import { Character, Race } from '../models/character.data';

// export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

// export type Payload = {
//   id: string;
// } & JwtPayload;

// export type State = {
//   loginState: LoginState;
//   token: string | null;
//   currenPayload: Payload | null;
//   currenUser: unknown | null;
//   characters: Character[];
//   menuControls: {
//     isOpen: boolean;
//   };
// };

// const initialState: State = {
//   loginState: 'idle',
//   token: null,
//   currenPayload: null,
//   currenUser: null,
//   characters: [],
//   menuControls: {
//     isOpen: false,
//   },
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class StateService {
//   private state$ = new BehaviorSubject<State>(initialState);
//   private character = new BehaviorSubject<Race>('elve');
//   private repoCharacter = inject(RepoCharacterService);
//   jwtDecode = jwtDecode;

//   constructor(private repo: RepoUsersService) {}

//   getState(): Observable<State> {
//     return this.state$.asObservable();
//   }
//   get state(): State {
//     return this.state$.value;
//   }
//   getCurrentState(): State {
//     return this.state$.value;
//   }

//   setLoginState(loginState: LoginState): void {
//     this.state$.next({ ...this.state$.value, loginState });
//   }
//   setCharacters(characters: Character[]): void {
//     this.state$.next({ ...this.state$.value, characters });
//   }
//   setLogin(token: string) {
//     const currenPayload = this.jwtDecode(token) as Payload;
//     localStorage.setItem('LOTR', token);
//     this.repo.getById(currenPayload.id).subscribe((user) => {
//       this.state$.next({
//         ...this.state$.value,
//         loginState: 'logged',
//         token,
//         currenPayload,
//         currenUser: user,
//       });
//     });
//   }
//   setLogout() {
//     localStorage.removeItem('LOTR');
//     this.state$.next({
//       ...this.state$.value,
//       loginState: 'idle',
//       token: null,
//       currenPayload: null,
//     });
//   }
//   setMenuControls(isOpen: boolean) {
//     this.state$.next({
//       ...this.state$.value,
//       menuControls: { isOpen },
//     });
//   }

//   get menuOptions() {
//     return this.state$.value.menuControls;
//   }
//   loadCharacter() {
//     this.repoCharacter.getCharacter().subscribe((characters) => {
//       this.state$.next({ ...this.state$.value, characters });
//     });
//   }
//   filterCharacter(race: Race) {
//     this.repoCharacter.filterCharacter(race).subscribe({
//       next: () => {
//         this.character.next(race);
//       },
//     });
//   }
//   constructImageUrl(url: string, width: string, height: string) {
//     const urlParts = url.split('/upload/');
//     const firstPart = urlParts[0] + '/upload/';
//     const secondPart = urlParts[1];
//     return (
//       firstPart + 'c_fill,' + 'w_' + width + ',h_' + height + '/' + secondPart
//     );
//   }
// }
import { Injectable, inject } from '@angular/core';
import { RepoUsersService } from './users.repo.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import RepoCharacterService from './character.service';
import { Character, Race } from '../models/character.data';

export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: unknown | null;
  characters: Character[];
  menuControls: {
    isOpen: boolean;
  };
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
  characters: [],
  menuControls: {
    isOpen: false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private character = new BehaviorSubject<Race>('elve');
  private repoCharacter = inject(RepoCharacterService);
  jwtDecode = jwtDecode;

  constructor(private repo: RepoUsersService) {}

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  get state(): State {
    return this.state$.value;
  }

  getCurrentState(): State {
    return this.state$.value;
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setCharacters(characters: Character[]): void {
    this.state$.next({ ...this.state$.value, characters });
  }

  setLogin(token: string) {
    const currenPayload = this.jwtDecode(token) as Payload;
    localStorage.setItem('LOTR', token);
    this.repo.getById(currenPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currenPayload,
        currenUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('LOTR');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
      currenUser: null,
    });
  }

  setMenuControls(isOpen: boolean) {
    this.state$.next({
      ...this.state$.value,
      menuControls: { isOpen },
    });
  }

  get menuOptions() {
    return this.state$.value.menuControls;
  }

  loadCharacter() {
    this.repoCharacter.getCharacter().subscribe((characters) => {
      this.state$.next({ ...this.state$.value, characters });
    });
  }

  filterCharacter(race: Race) {
    this.repoCharacter.filterCharacter(race).subscribe({
      next: () => {
        this.character.next(race);
      },
    });
  }

  constructImageUrl(url: string, width: string, height: string) {
    const urlParts = url.split('/upload/');
    const firstPart = urlParts[0] + '/upload/';
    const secondPart = urlParts[1];
    return (
      firstPart + 'c_fill,' + 'w_' + width + ',h_' + height + '/' + secondPart
    );
  }
}
