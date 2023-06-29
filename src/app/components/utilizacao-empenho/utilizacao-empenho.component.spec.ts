import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizacaoEmpenhoComponent } from './utilizacao-empenho.component';

describe('UtilizacaoEmpenhoComponent', () => {
  let component: UtilizacaoEmpenhoComponent;
  let fixture: ComponentFixture<UtilizacaoEmpenhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilizacaoEmpenhoComponent]
    });
    fixture = TestBed.createComponent(UtilizacaoEmpenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
