import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromDatagrid from './datagrid.reducer';
import * as DatagridActions from './datagrid.actions';

@Injectable()
export class DatagridEffects {
  loadDatagrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DatagridActions.loadDatagrid),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DatagridActions.loadDatagridSuccess({ datagrid: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DatagridActions.loadDatagridFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
