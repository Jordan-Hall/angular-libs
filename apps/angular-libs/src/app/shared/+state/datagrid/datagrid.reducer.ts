import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ApiDataActions from './datagrid.actions';
import { DatagridColumnOrder } from './datagrid.model';

export const DATAGRID_FEATURE_KEY = 'datagrid';

export interface State extends EntityState<DatagridColumnOrder> {
  restored: boolean,
  selectedId?: string; // which ApiData record has been selected

}

export interface DataGridPartialState {
  readonly [DATAGRID_FEATURE_KEY]: State;
}

export const datagridAdapter: EntityAdapter<DatagridColumnOrder> = createEntityAdapter<DatagridColumnOrder>({
  selectId: (entity) => entity.column
});

export const initialState: State = datagridAdapter.getInitialState({ restored: false});



const datagridReducer = createReducer(
  initialState,
  on(ApiDataActions.updateDataGrid, (state, { columnOrder }) =>
    datagridAdapter.setAll(columnOrder, { ...state, restored: true })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return datagridReducer(state, action);
}
