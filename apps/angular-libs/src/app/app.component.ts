import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiDataFacade } from './+state/api-data.facade';
import { DatagridFacade } from './shared/+state/datagrid/datagrid.facade';
import { combineLatest, Subject, Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { filter, take, switchMap, takeUntil, tap, map} from 'rxjs/operators';
import { ApiModel } from '@angular-libs/api-model';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { DatagridColumnOrder } from './shared/+state/datagrid/datagrid.model';
// import sortBy from 'lodash.sortby';


@Component({
  selector: 'angular-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private apiDataFacade: ApiDataFacade, private datagridFacade: DatagridFacade, private changeRef: ChangeDetectorRef) {}

  private onDestory = new Subject();

  public columns: DatagridColumnOrder[] = [];

  public dataConent$: Observable<ApiModel[]>;


  public sortBy$ = this.datagridFacade.sortBy$;

  ngOnInit(): void {
    this.apiDataFacade.loadData();
    this.datagridFacade.init();
    combineLatest([this.datagridFacade.isLoaded$.pipe(filter(r => r)), this.datagridFacade.datagridOrder$])
    .pipe(takeUntil(this.onDestory), take(1))
    .subscribe(([order, data]) => {
      if(!data.length) {
        this.initColumns()
      }
    });

    this.datagridFacade.datagridOrder$
    .pipe(takeUntil(this.onDestory), map(data => data.sort((a, b) => a.order - b.order)))
    .subscribe(cols => { this.columns = cols; this.changeRef.markForCheck() })


    this.dataConent$ = combineLatest([this.apiDataFacade.allApiData$, this.sortBy$])
      .pipe(
        takeUntil(this.onDestory),
        map(([data, sort]) => {
          if (sort.length) {
            // return sortBy(data, sort.map(s => s.column), sort.map(s => s.desc ? 'desc' : 'asc'));
            return data.sort((a,b) => {
              for(const opt of sort) {
                  if (a[opt.column] > b[opt.column]) return opt.desc ? -1 : 1;
	                if (a[opt.column] < b[opt.column]) return opt.desc ? 1 : -1;
              }
            })
          }
          return data;
        })
      )

  }

  ngOnDestroy(): void {
    this.onDestory.next();
    this.onDestory.complete();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    const clone = this.columns.map(c => ({...c}) );
    moveItemInArray(clone, event.previousIndex, event.currentIndex)
    const newOrder = clone.map((column, index) => ({...column, order: index + 1}));
    this.datagridFacade.updateOrder(newOrder);
  }


  sort(column: string) {

    this.sortBy$.pipe(take(1)).subscribe(sorting => {
      const sort = sorting.find(s => s.column === column);
      if(sort) {
        const filteredOut = sorting.filter(s => s.column !== sort.column);
        this.datagridFacade.updateSorting(!sort.desc ? filteredOut : [...filteredOut, { column: column, desc: false }])
      } else {
        this.datagridFacade.updateSorting([...sorting, { column: column, desc: true }])
      }
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
