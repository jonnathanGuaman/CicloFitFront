import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioCreateComponent } from './ejercicio-create.component';

describe('EjercicioCreateComponent', () => {
  let component: EjercicioCreateComponent;
  let fixture: ComponentFixture<EjercicioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EjercicioCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EjercicioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
