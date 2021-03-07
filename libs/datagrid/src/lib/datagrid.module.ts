import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibertyDataGrid } from './datagrid.component';
import { LibertyDataGridHeader } from './components/header/header.component';
import { LibertyDataGridRow } from './components/row/row.component';
import { DataGridCell } from './directive/data-cell.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
@NgModule({
  imports: [CommonModule, DragDropModule],
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
