import { createAction, props } from '@ngrx/store';
import { DatagridEntity } from './datagrid.models';

export const loadDatagrid = createAction('[Datagrid] Load Datagrid');

export const loadDatagridSuccess = createAction(
  '[Datagrid] Load Datagrid Success',
  props<{ datagrid: DatagridEntity[] }>()
);

export const loadDatagridFailure = createAction(
  '[Datagrid] Load Datagrid Failure',
  props<{ error: any }>()
);
