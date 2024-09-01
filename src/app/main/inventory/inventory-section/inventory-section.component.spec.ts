import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { InventorySectionComponent } from './inventory-section.component';

describe('InventorySectionComponent', () => {
  let component: InventorySectionComponent;
  let fixture: ComponentFixture<InventorySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySectionComponent ],
    });
    fixture = TestBed.createComponent(InventorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
