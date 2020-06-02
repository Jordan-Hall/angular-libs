import { Component, HostBinding, ContentChild, QueryList, AfterContentInit, ViewContainerRef, ElementRef, ContentChildren, forwardRef} from "@angular/core";
import { DataGridCell } from '../../directive/header-cell.component';

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
}
