import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasideTownComponent } from './seaside-town.component';

describe('SeasideTownComponent', () => {
  let component: SeasideTownComponent;
  let fixture: ComponentFixture<SeasideTownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasideTownComponent]
    });
    fixture = TestBed.createComponent(SeasideTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
