import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescSkillEffectComponent } from './desc-skill-effect.component';

describe('DescSkillEffectComponent', () => {
  let component: DescSkillEffectComponent;
  let fixture: ComponentFixture<DescSkillEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DescSkillEffectComponent ],
    });
    fixture = TestBed.createComponent(DescSkillEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
