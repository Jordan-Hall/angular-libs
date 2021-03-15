import { Directive, TemplateRef, Input } from "@angular/core";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[dataGridCell]',
    exportAs: 'datagrid'
})
export class DataGridCell {
  @Input() class = '';
  constructor(public template: TemplateRef<any>) {
  }

}
