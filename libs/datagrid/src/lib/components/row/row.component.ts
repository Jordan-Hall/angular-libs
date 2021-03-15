import { Component, HostBinding, ContentChildren, QueryList, Input } from "@angular/core";
import { DataGridCell } from '../../directive/data-cell.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'liberty-grid-row',
    template: '',
})
export class LibertyDataGridRow {
    @HostBinding('attr.role')
    role = 'rowgroup';
    @Input() class = '';
    @ContentChildren(DataGridCell, { descendants: true })
    public cells: QueryList<DataGridCell>;
}
