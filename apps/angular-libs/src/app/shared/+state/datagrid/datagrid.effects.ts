import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as DatagridActions from './datagrid.actions';
import { map, filter, switchMap } from 'rxjs/operators';

const storageKey = 'DATAGRID';
const storageKeySorting = 'DATAGRID+SORT';

@Injectable()
export class DatagridEffects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(DatagridActions.init),
    switchMap(() => {
      const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const sorting = JSON.parse(localStorage.getItem(storageKeySorting) || "[]");
      return [DatagridActions.updateDataGrid({ columnOrder: data }), DatagridActions.updateSorting({sorting})]
    })
  ))

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(DatagridActions.updateDataGrid),
    map((result) => localStorage.setItem(storageKey, JSON.stringify(result?.columnOrder || [])))
  ), {dispatch: false})

  updateSorting$ = createEffect(() => this.actions$.pipe(
    ofType(DatagridActions.updateSorting),
    map((result) => localStorage.setItem(storageKeySorting, JSON.stringify(result?.sorting || [])))
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
  ) {}
}
