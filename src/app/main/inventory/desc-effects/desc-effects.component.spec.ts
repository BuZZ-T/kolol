import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { DescEffectsComponent } from './desc-effects.component';

describe('DescEffectsComponent', () => {
  let component: DescEffectsComponent;
  let fixture: ComponentFixture<DescEffectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DescEffectsComponent ],
    });
    fixture = TestBed.createComponent(DescEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
