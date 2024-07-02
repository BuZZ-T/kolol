import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainComponent } from './gain.component';

describe('EffectComponent', () => {
  let component: GainComponent;
  let fixture: ComponentFixture<GainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GainComponent ],
    });
    fixture = TestBed.createComponent(GainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
