import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { AwesomeMenuComponent } from './awesome-menu.component';

describe('AwesomeMenuComponent', () => {
  let component: AwesomeMenuComponent;
  let fixture: ComponentFixture<AwesomeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AwesomeMenuComponent ],
    });
    fixture = TestBed.createComponent(AwesomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
