import { Component, HostBinding, Directive, TemplateRef, ViewContainerRef, ElementRef } from "@angular/core";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[dataGridCell]',
    exportAs: 'datagrid'
})
export class DataGridCell {

    constructor(public template: TemplateRef<any>) {
    }

}
