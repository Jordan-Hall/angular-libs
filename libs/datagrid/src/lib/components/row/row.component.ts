import { Component, HostBinding, ContentChildren, QueryList } from "@angular/core";
import { DataGridCell } from '../../directive/data-cell.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'liberty-grid-row',
    template: '',
})
export class LibertyDataGridRow {
    @HostBinding('attr.role')
    role = 'rowgroup';

    @ContentChildren(DataGridCell, { descendants: true })
    public cells: QueryList<DataGridCell>;
}
