import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { TavernComponent } from './tavern.component';

describe('TavernComponent', () => {
  let component: TavernComponent;
  let fixture: ComponentFixture<TavernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TavernComponent ],
    });
    fixture = TestBed.createComponent(TavernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
