import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DATAGRID_FEATURE_KEY,
  State,
  DataGridPartialState,
  datagridAdapter,
} from './datagrid.reducer';

export const getDatagridState = createFeatureSelector<DataGridPartialState,State>(DATAGRID_FEATURE_KEY);

const { selectAll, selectEntities } = datagridAdapter.getSelectors();


export const getAllDatagrid = createSelector(getDatagridState, (state: State) =>
  selectAll(state)
);

export const getDatagridEntities = createSelector(
  getDatagridState,
  (state: State) => selectEntities(state)
);


export const isLoaded = createSelector(
  getDatagridState,
  (state: State) => state.restored
);

export const sortBy = createSelector(
  getDatagridState,
  (state: State) => state.sortBy
);

export const getSelectedId = createSelector(
  getDatagridState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDatagridState,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);



