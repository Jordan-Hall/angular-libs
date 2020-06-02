import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DatagridEffects } from './datagrid.effects';
import * as DatagridActions from './datagrid.actions';

describe('DatagridEffects', () => {
  let actions: Observable<any>;
  let effects: DatagridEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DatagridEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DatagridEffects);
  });

  describe('loadDatagrid$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DatagridActions.loadDatagrid() });

      const expected = hot('-a-|', {
        a: DatagridActions.loadDatagridSuccess({ datagrid: [] }),
      });

      expect(effects.loadDatagrid$).toBeObservable(expected);
    });
  });
});
