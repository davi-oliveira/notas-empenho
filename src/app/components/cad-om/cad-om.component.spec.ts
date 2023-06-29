import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadOMComponent } from './cad-om.component';

describe('CadOMComponent', () => {
  let component: CadOMComponent;
  let fixture: ComponentFixture<CadOMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadOMComponent]
    });
    fixture = TestBed.createComponent(CadOMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
