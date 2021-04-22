import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanterComponent } from './edit-planter.component';

describe('EditPlanterComponent', () => {
  let component: EditPlanterComponent;
  let fixture: ComponentFixture<EditPlanterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlanterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
