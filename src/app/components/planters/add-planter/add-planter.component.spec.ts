import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanterComponent } from './add-planter.component';

describe('AddPlanterComponent', () => {
  let component: AddPlanterComponent;
  let fixture: ComponentFixture<AddPlanterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
