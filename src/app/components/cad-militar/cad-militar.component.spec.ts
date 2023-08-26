import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadMilitarComponent } from './cad-militar.component';

describe('CadMilitarComponent', () => {
  let component: CadMilitarComponent;
  let fixture: ComponentFixture<CadMilitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadMilitarComponent]
    });
    fixture = TestBed.createComponent(CadMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
