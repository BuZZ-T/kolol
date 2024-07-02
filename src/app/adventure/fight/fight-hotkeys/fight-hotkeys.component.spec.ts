import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FightHotkeysComponent } from './fight-hotkeys.component';

describe('FightHotkeysComponent', () => {
  let component: FightHotkeysComponent;
  let fixture: ComponentFixture<FightHotkeysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FightHotkeysComponent ],
    });
    fixture = TestBed.createComponent(FightHotkeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
