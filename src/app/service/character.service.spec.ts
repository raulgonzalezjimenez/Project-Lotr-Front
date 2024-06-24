import { TestBed } from '@angular/core/testing';

import CharacterService from './character.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import RepoCharacterService from './character.service';
import { environment } from '../../environments/environment.development';

const expectedUrl = new URL('character', environment.apiUrl).href;

describe('CharacterService', () => {
  let service: CharacterService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RepoCharacterService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAll', () => {
    service
      .getCharacter()
      .subscribe((character) => expect(character).toEqual([]));
    const req: TestRequest = controller.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
