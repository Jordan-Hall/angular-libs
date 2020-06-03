import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as DatagridActions from './datagrid.actions';
import { map, filter } from 'rxjs/operators';

const storageKey = 'DATAGRID';

@Injectable()
export class DatagridEffects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(DatagridActions.init),
    map(() => {
      const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return DatagridActions.updateDataGrid({ columnOrder: data })
    })
  ))

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(DatagridActions.updateDataGrid),
    map((result) => localStorage.setItem(storageKey, JSON.stringify(result?.columnOrder || [])))
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
  ) {}
}
