import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { UseMultiComponent } from './use-multi.component';

describe('UseMultiComponent', () => {
  let component: UseMultiComponent;
  let fixture: ComponentFixture<UseMultiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UseMultiComponent ],
    });
    fixture = TestBed.createComponent(UseMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
