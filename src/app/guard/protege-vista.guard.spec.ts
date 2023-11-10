import { TestBed } from '@angular/core/testing';

import { ProtegeVistaGuard } from './protege-vista.guard';

describe('ProtegeVistaGuard', () => {
  let guard: ProtegeVistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegeVistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
