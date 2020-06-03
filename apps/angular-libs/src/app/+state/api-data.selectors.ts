import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APIDATA_FEATURE_KEY,
  State,
  ApiDataPartialState,
  apiDataAdapter,
} from './api-data.reducer';

// Lookup the 'ApiData' feature state managed by NgRx
export const getApiDataState = createFeatureSelector<
  ApiDataPartialState,
  State
>(APIDATA_FEATURE_KEY);

const { selectAll, selectEntities } = apiDataAdapter.getSelectors();

export const getApiDataLoaded = createSelector(
  getApiDataState,
  (state: State) => state.loaded
);

export const getApiDataError = createSelector(
  getApiDataState,
  (state: State) => state.error
);

export const getAllApiData = createSelector(getApiDataState, (state: State) =>
  selectAll(state)
);

export const getApiDataEntities = createSelector(
  getApiDataState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getApiDataState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getApiDataEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
