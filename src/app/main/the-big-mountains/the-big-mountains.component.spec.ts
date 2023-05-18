import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBigMountainsComponent } from './the-big-mountains.component';

describe('TheBigMountainsComponent', () => {
  let component: TheBigMountainsComponent;
  let fixture: ComponentFixture<TheBigMountainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheBigMountainsComponent]
    });
    fixture = TestBed.createComponent(TheBigMountainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
