import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibertyDataGrid } from './datagrid.component';
import { LibertyDataGridHeader } from './components/header/header.component';
import { LibertyDataGridRow } from './components/row/row.component';
import { DataGridCell } from './directive/header-cell.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LibertyDataGrid,
    LibertyDataGridHeader,
    DataGridCell,
    LibertyDataGridRow,
  ],
  exports: [
    LibertyDataGrid,
    LibertyDataGridHeader,
    DataGridCell,
    LibertyDataGridRow,
  ]
})
export class DatagridModule {}
