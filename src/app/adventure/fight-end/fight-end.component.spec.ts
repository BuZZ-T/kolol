import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FightEndComponent } from './fight-end.component';

describe('FightEndComponent', () => {
  let component: FightEndComponent;
  let fixture: ComponentFixture<FightEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FightEndComponent ],
    });
    fixture = TestBed.createComponent(FightEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
