import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DatagridEntity } from './datagrid.models';
import { DatagridEffects } from './datagrid.effects';
import { DatagridFacade } from './datagrid.facade';

import * as DatagridSelectors from './datagrid.selectors';
import * as DatagridActions from './datagrid.actions';
import {
  DATAGRID_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './datagrid.reducer';

interface TestSchema {
  datagrid: State;
}

describe('DatagridFacade', () => {
  let facade: DatagridFacade;
  let store: Store<TestSchema>;
  const createDatagridEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DatagridEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DATAGRID_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DatagridEffects]),
        ],
        providers: [DatagridFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(DatagridFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDatagrid$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(DatagridActions.loadDatagrid());

        list = await readFirst(facade.allDatagrid$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDatagridSuccess` to manually update list
     */
    it('allDatagrid$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDatagrid$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          DatagridActions.loadDatagridSuccess({
            datagrid: [
              createDatagridEntity('AAA'),
              createDatagridEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allDatagrid$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
