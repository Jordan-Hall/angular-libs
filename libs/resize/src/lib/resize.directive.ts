import { Directive, OnInit, NgZone, ElementRef, OnDestroy, Renderer2, Inject, Output } from "@angular/core";
import { fromEvent, Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, map, tap,  } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common'
import { EventEmitter } from 'events';

const rezieActiveClass = 'resizer-active';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[resize]',
  exportAs: 'resize'
})
export class ResizeDirective implements OnInit, OnDestroy {

  private onDestory = new Subject();
  private mouseDown: Observable<number>;
  private mouseMove: Observable<MouseEvent>;
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @Output() widthChange = new EventEmitter();


  constructor(private zone: NgZone, private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.element.style.position = 'relative';
      const div = this.createResziserHandler();

      this.renderer.appendChild(this.element, div);
      this.mouseDown = fromEvent(
        div,
        'mousedown'
      ).pipe(
        takeUntil(this.onDestory),
        map((event: MouseEvent) => this.element.offsetWidth - event.pageX),
        tap(() => {
          this.renderer.addClass(this.element, rezieActiveClass);
        }),
      );

      fromEvent<MouseEvent>(this.document, 'mouseup').pipe(takeUntil(this.onDestory)).subscribe(() => {
        if(this.element.classList.contains(rezieActiveClass)) {
          this.renderer.removeClass(this.element, rezieActiveClass);
        }
      })

      this.mouseMove = fromEvent<MouseEvent>(
        this.document,
        'mousemove'
      ).pipe(
        takeUntil(this.onDestory)
      );
    });

    this.resize();

  }

  private resize() {
    this.zone.runOutsideAngular(() => {
      combineLatest([this.mouseDown, this.mouseMove])
      .pipe(takeUntil(this.onDestory))
      .subscribe(([startPos, mosueEvent]) => {
        if(this.element.classList.contains(rezieActiveClass)) {
          this.element.style.width = `${startPos + mosueEvent.pageX}px`;
          this.widthChange.emit(this.element.style.width);
        }
      })
    });
  }

  private createResziserHandler(): HTMLElement {
    const div = this.document.createElement('div');
    div.style.position = "absolute";
    div.style.right = "-2.5px";
    div.style.top = "0";
    div.style.width = "5px";
    div.style.cursor = "col-resize";
    div.style.height = "100%";
    return div;
  }
  ngOnDestroy(): void {
    this.onDestory.next();
    this.onDestory.complete();
  }
}
