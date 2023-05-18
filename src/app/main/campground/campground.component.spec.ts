import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundComponent } from './campground.component';

describe('CampgroundComponent', () => {
  let component: CampgroundComponent;
  let fixture: ComponentFixture<CampgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampgroundComponent]
    });
    fixture = TestBed.createComponent(CampgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
