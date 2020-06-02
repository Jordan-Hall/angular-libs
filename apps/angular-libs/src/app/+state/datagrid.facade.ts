import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDatagrid from './datagrid.reducer';
import * as DatagridSelectors from './datagrid.selectors';

@Injectable()
export class DatagridFacade {
  loaded$ = this.store.pipe(select(DatagridSelectors.getDatagridLoaded));
  allDatagrid$ = this.store.pipe(select(DatagridSelectors.getAllDatagrid));
  selectedDatagrid$ = this.store.pipe(select(DatagridSelectors.getSelected));

  constructor(private store: Store<fromDatagrid.DatagridPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
