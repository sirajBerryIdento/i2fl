import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratorComponent } from './integrator.component';

describe('IntegratorComponent', () => {
  let component: IntegratorComponent;
  let fixture: ComponentFixture<IntegratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
