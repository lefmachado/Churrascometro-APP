import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusChurrascosComponent } from './meus-churrascos.component';

describe('MeusChurrascosComponent', () => {
  let component: MeusChurrascosComponent;
  let fixture: ComponentFixture<MeusChurrascosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusChurrascosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeusChurrascosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
