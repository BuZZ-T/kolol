import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { EffectComponent } from './effect.component';

describe('EffectComponent', () => {
  let component: EffectComponent;
  let fixture: ComponentFixture<EffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectComponent ],
    });
    fixture = TestBed.createComponent(EffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
