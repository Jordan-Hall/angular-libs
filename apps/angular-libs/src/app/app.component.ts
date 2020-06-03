import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiDataFacade } from './+state/api-data.facade';
import { DatagridFacade } from './shared/+state/datagrid/datagrid.facade';
import { combineLatest, Subject, Observable, forkJoin } from 'rxjs';
import { filter, take, switchMap, takeUntil, tap, map} from 'rxjs/operators';
import { ApiModel } from '@angular-libs/api-model';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: 'angular-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public apiDataFacade: ApiDataFacade, private datagridFacade: DatagridFacade) {}

  private onDestory = new Subject();

  public dataGridContent: Observable<ApiModel[]>

  public columns$ = this.datagridFacade.datagridOrder$.pipe(map(data => data.sort((a, b) => a.order - b.order)))

  ngOnInit(): void {
    this.apiDataFacade.loadData();
    this.datagridFacade.init();
    combineLatest([this.datagridFacade.isLoaded$.pipe(filter(r => r)), this.datagridFacade.datagridOrder$])
    .pipe(takeUntil(this.onDestory), take(1))
    .subscribe(([order, data]) => {
      if(!data.length) {
        this.initColumns()
      }
    })

  }

  ngOnDestroy(): void {
    this.onDestory.next();
    this.onDestory.complete();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    this.columns$.pipe(take(1)).subscribe(columns => {
      moveItemInArray(columns, event.previousIndex, event.currentIndex)
      const newOrder = columns.map((column, index) => {
        column.order = index + 1;
        return column;
      });
      debugger;
      this.datagridFacade.updateOrder(newOrder);
    })

  }

  private initColumns() {
    this.datagridFacade.updateOrder([
      {
        order:1,
        column: "id"
      },
      {
        order: 2,
        column: "name",
      },
      {
        order: 3,
        column: "address",
      },
      {
        order: 4,
        column: "country"
      },
      {
        order: 5,
        column: "postcode"
      }
    ])
  }
}
