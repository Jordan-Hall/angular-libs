import { Component, HostBinding, ContentChildren, ContentChild, ChangeDetectionStrategy } from "@angular/core";
import { LibertyDataGridHeader } from './components/header/header.component';
import { LibertyDataGridRow } from './components/row/row.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'liberty-grid',
    templateUrl: 'datagrid.component.html',
    styleUrls: ['datagrid.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class LibertyDataGrid {
    @HostBinding('attr.role')
    role = 'table';

    @ContentChild(LibertyDataGridHeader, { static: true })
    private headerStatic: LibertyDataGridHeader;
    @ContentChild(LibertyDataGridHeader, { static: false })
    private headerNoneStatic: LibertyDataGridHeader;
    private _header: LibertyDataGridHeader = null;
    get header() {
      return this._header || this.headerNoneStatic || this.headerStatic;
    }

    @ContentChildren(LibertyDataGridRow)
    private _rowsChildren: LibertyDataGridRow;
    private _rows: LibertyDataGridRow = null;
    get rows() {
      return this._rows || this._rowsChildren;
    }


    cdkDropListDropped(event) {
      this.header.cdkDropListDropped.emit(event);
    }
}
