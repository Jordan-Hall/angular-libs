import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDatagrid from './datagrid.reducer';
import * as datagridSelectors from './datagrid.selectors';
import { DatagridColumnOrder } from './datagrid.model';
import { updateDataGrid, init } from './datagrid.actions';

@Injectable()
export class DatagridFacade {
  datagridOrder$ = this.store.pipe(select(datagridSelectors.getAllDatagrid));
  isLoaded$ = this.store.pipe(select(datagridSelectors.isLoaded));

  constructor(private store: Store<fromDatagrid.DataGridPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  updateOrder(order: DatagridColumnOrder[]) {
    this.store.dispatch(updateDataGrid({ columnOrder: order }))
  }

  init() {
    this.store.dispatch(init());
  }
}
