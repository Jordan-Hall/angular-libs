import { createAction, props } from '@ngrx/store';
import { DatagridColumnOrder } from './datagrid.model';


export const updateDataGrid = createAction(
  '[datagrid] update datagrid',
  props<{ columnOrder: DatagridColumnOrder[] }>()
);


export const init = createAction(
  '[datagrid] init'
);
