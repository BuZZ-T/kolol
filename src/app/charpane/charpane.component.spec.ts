import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { CharpaneComponent } from './charpane.component';

describe('CharpaneComponent', () => {
  let component: CharpaneComponent;
  let fixture: ComponentFixture<CharpaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CharpaneComponent ],
    });
    fixture = TestBed.createComponent(CharpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
