import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescOutfitComponent } from './desc-outfit.component';

describe('DescOutfitComponent', () => {
  let component: DescOutfitComponent;
  let fixture: ComponentFixture<DescOutfitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescOutfitComponent]
    });
    fixture = TestBed.createComponent(DescOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
