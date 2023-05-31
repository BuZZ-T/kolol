import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheDistantWoodsComponent } from './the-distant-woods.component';

describe('TheDistantWoodsComponent', () => {
  let component: TheDistantWoodsComponent;
  let fixture: ComponentFixture<TheDistantWoodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TheDistantWoodsComponent ],
    });
    fixture = TestBed.createComponent(TheDistantWoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
