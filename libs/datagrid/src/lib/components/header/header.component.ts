import { Component, HostBinding, QueryList, ContentChildren, Output, EventEmitter} from "@angular/core";
import { DataGridCell } from '../../directive/data-cell.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'liberty-grid-header',
    template: '',
})
export class LibertyDataGridHeader {
    @HostBinding('attr.role')
    role = 'rowgroup';

    @ContentChildren(DataGridCell, { descendants: true })
    public cells: QueryList<DataGridCell>;

    @Output()
    cdkDropListDropped = new EventEmitter();
}
