import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanterListComponent } from './planter-list.component';

describe('PlanterListComponent', () => {
  let component: PlanterListComponent;
  let fixture: ComponentFixture<PlanterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
