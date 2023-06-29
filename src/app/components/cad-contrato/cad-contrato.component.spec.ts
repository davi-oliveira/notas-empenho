import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadContratoComponent } from './cad-contrato.component';

describe('CadContratoComponent', () => {
  let component: CadContratoComponent;
  let fixture: ComponentFixture<CadContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadContratoComponent]
    });
    fixture = TestBed.createComponent(CadContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
