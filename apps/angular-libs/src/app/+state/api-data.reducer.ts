import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ApiDataActions from './api-data.actions';
import { ApiModel } from '@angular-libs/api-model';

export const APIDATA_FEATURE_KEY = 'apiData';

export interface State extends EntityState<ApiModel> {
  selectedId?: number; // which ApiData record has been selected
  loaded: boolean; // has the ApiData list been loaded
  error?: string | null; // last none error (if any)
}

export interface ApiDataPartialState {
  readonly [APIDATA_FEATURE_KEY]: State;
}

export const apiDataAdapter: EntityAdapter<ApiModel> = createEntityAdapter<ApiModel>();

export const initialState: State = apiDataAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const apiDataReducer = createReducer(
  initialState,
  on(ApiDataActions.loadApiData, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ApiDataActions.loadApiDataSuccess, (state, { apiData }) =>
    apiDataAdapter.setAll(apiData, { ...state, loaded: true })
  ),
  on(ApiDataActions.loadApiDataFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return apiDataReducer(state, action);
}
