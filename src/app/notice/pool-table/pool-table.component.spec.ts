import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { PoolTableComponent } from './pool-table.component';

describe('PoolTableComponent', () => {
  let component: PoolTableComponent;
  let fixture: ComponentFixture<PoolTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolTableComponent ],
    });
    fixture = TestBed.createComponent(PoolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
