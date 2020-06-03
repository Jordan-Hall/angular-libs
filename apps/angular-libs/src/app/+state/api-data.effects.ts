import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromApiData from './api-data.reducer';
import * as ApiDataActions from './api-data.actions';
import { ApiService } from '../shared/api.serivce';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiDataEffects {
  loadApiData$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ApiDataActions.loadApiData, {
      run: (
        action: ReturnType<typeof ApiDataActions.loadApiData>,
        state: fromApiData.ApiDataPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return this.api.getData().pipe(map(result => ApiDataActions.loadApiDataSuccess({ apiData: result }) ))
      },

      onError: (
        action: ReturnType<typeof ApiDataActions.loadApiData>,
        error
      ) => {
        console.error('Error', error);
        return ApiDataActions.loadApiDataFailure({ error });
      },
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromApiData.ApiDataPartialState>,
    private api: ApiService
  ) {}
}
