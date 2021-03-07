import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDatagrid from './datagrid.reducer';
import * as datagridSelectors from './datagrid.selectors';
import { DatagridColumnOrder, SortBy } from './datagrid.model';
import { updateDataGrid, init, updateSorting } from './datagrid.actions';

@Injectable()
export class DatagridFacade {
  datagridOrder$ = this.store.pipe(select(datagridSelectors.getAllDatagrid));
  isLoaded$ = this.store.pipe(select(datagridSelectors.isLoaded));
  sortBy$ = this.store.pipe(select(datagridSelectors.sortBy));

  constructor(private store: Store<fromDatagrid.DataGridPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  updateOrder(order: DatagridColumnOrder[]) {
    this.store.dispatch(updateDataGrid({ columnOrder: order }))
  }

  updateSorting(sorting: SortBy[]) {
    this.store.dispatch(updateSorting({ sorting }))
  }

  init() {
    this.store.dispatch(init());
  }
}
