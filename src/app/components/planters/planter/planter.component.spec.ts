import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanterComponent } from './planter.component';

describe('PlanterComponent', () => {
  let component: PlanterComponent;
  let fixture: ComponentFixture<PlanterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
