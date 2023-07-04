import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarComponent } from './cellar.component';

describe('CellarComponent', () => {
  let component: CellarComponent;
  let fixture: ComponentFixture<CellarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellarComponent]
    });
    fixture = TestBed.createComponent(CellarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
