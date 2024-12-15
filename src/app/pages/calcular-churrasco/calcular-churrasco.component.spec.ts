import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularChurrascoComponent } from './calcular-churrasco.component';

describe('CalcularChurrascoComponent', () => {
  let component: CalcularChurrascoComponent;
  let fixture: ComponentFixture<CalcularChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcularChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcularChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
