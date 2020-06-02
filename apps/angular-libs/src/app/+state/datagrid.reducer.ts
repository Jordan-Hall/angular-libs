import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DatagridActions from './datagrid.actions';
import { DatagridEntity } from './datagrid.models';

export const DATAGRID_FEATURE_KEY = 'datagrid';

export interface State extends EntityState<DatagridEntity> {
  selectedId?: string | number; // which Datagrid record has been selected
  loaded: boolean; // has the Datagrid list been loaded
  error?: string | null; // last none error (if any)
}

export interface DatagridPartialState {
  readonly [DATAGRID_FEATURE_KEY]: State;
}

export const datagridAdapter: EntityAdapter<DatagridEntity> = createEntityAdapter<
  DatagridEntity
>();

export const initialState: State = datagridAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const datagridReducer = createReducer(
  initialState,
  on(DatagridActions.loadDatagrid, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DatagridActions.loadDatagridSuccess, (state, { datagrid }) =>
    datagridAdapter.addAll(datagrid, { ...state, loaded: true })
  ),
  on(DatagridActions.loadDatagridFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return datagridReducer(state, action);
}
