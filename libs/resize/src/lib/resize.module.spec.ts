import { async, TestBed } from '@angular/core/testing';
import { ResizeModule } from './resize.module';

describe('ResizeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ResizeModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ResizeModule).toBeDefined();
  });
});
