import { ApiModel } from '@angular-libs/api-model';

export interface DatagridColumnOrder {
  order: number;
  column: keyof ApiModel
}
