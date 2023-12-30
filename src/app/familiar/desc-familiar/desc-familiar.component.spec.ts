import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescFamiliarComponent } from './desc-familiar.component';

describe('DescFamiliarComponent', () => {
  let component: DescFamiliarComponent;
  let fixture: ComponentFixture<DescFamiliarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DescFamiliarComponent ],
    });
    fixture = TestBed.createComponent(DescFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
