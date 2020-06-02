import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DATAGRID_FEATURE_KEY,
  State,
  DatagridPartialState,
  datagridAdapter,
} from './datagrid.reducer';

// Lookup the 'Datagrid' feature state managed by NgRx
export const getDatagridState = createFeatureSelector<
  DatagridPartialState,
  State
>(DATAGRID_FEATURE_KEY);

const { selectAll, selectEntities } = datagridAdapter.getSelectors();

export const getDatagridLoaded = createSelector(
  getDatagridState,
  (state: State) => state.loaded
);

export const getDatagridError = createSelector(
  getDatagridState,
  (state: State) => state.error
);

export const getAllDatagrid = createSelector(getDatagridState, (state: State) =>
  selectAll(state)
);

export const getDatagridEntities = createSelector(
  getDatagridState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDatagridState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDatagridEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
