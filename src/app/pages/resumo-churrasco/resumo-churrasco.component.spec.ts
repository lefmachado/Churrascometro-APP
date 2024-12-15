import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoChurrascoComponent } from './resumo-churrasco.component';

describe('ResumoChurrascoComponent', () => {
  let component: ResumoChurrascoComponent;
  let fixture: ComponentFixture<ResumoChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumoChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
