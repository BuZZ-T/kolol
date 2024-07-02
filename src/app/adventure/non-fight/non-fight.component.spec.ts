import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFightComponent } from './non-fight.component';

describe('NonFightComponent', () => {
  let component: NonFightComponent;
  let fixture: ComponentFixture<NonFightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFightComponent ],
    });
    fixture = TestBed.createComponent(NonFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
