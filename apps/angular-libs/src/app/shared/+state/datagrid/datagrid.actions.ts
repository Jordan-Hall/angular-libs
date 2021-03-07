import { createAction, props } from '@ngrx/store';
import { DatagridColumnOrder, SortBy } from './datagrid.model';


export const updateDataGrid = createAction(
  '[datagrid] update datagrid',
  props<{ columnOrder: DatagridColumnOrder[] }>()
);


export const init = createAction(
  '[datagrid] init'
);

export const updateSorting = createAction(
  '[datagrid] update sorting',
  props<{ sorting: SortBy[] }>()
)
