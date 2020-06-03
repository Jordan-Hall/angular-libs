import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromApiData from './api-data.reducer';
import * as ApiDataSelectors from './api-data.selectors';
import { loadApiData } from './api-data.actions';

@Injectable()
export class ApiDataFacade {
  loaded$ = this.store.pipe(select(ApiDataSelectors.getApiDataLoaded));
  allApiData$ = this.store.pipe(select(ApiDataSelectors.getAllApiData));
  selectedApiData$ = this.store.pipe(select(ApiDataSelectors.getSelected));

  constructor(private store: Store<fromApiData.ApiDataPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadData() {
    this.store.dispatch(loadApiData())
  }
}
