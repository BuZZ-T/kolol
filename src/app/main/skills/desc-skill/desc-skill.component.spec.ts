import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescSkillComponent } from './desc-skill.component';

describe('DescSkillComponent', () => {
  let component: DescSkillComponent;
  let fixture: ComponentFixture<DescSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DescSkillComponent ],
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(DescSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
