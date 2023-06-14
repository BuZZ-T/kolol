import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaughtySorceressTowerComponent } from './naughty-sorceress-tower.component';

describe('NaughtySorceressTowerComponent', () => {
  let component: NaughtySorceressTowerComponent;
  let fixture: ComponentFixture<NaughtySorceressTowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NaughtySorceressTowerComponent]
    });
    fixture = TestBed.createComponent(NaughtySorceressTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
