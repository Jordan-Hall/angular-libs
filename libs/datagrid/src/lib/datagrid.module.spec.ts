import { async, TestBed } from '@angular/core/testing';
import { DatagridModule } from './datagrid.module';

describe('DatagridModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatagridModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DatagridModule).toBeDefined();
  });
});
