import { createAction, props } from '@ngrx/store';
import { ApiModel } from '@angular-libs/api-model';

export const loadApiData = createAction('[ApiData] Load ApiData');

export const loadApiDataSuccess = createAction(
  '[ApiData] Load ApiData Success',
  props<{ apiData: ApiModel[] }>()
);

export const loadApiDataFailure = createAction(
  '[ApiData] Load ApiData Failure',
  props<{ error: any }>()
);
