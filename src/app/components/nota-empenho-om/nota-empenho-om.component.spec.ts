import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEmpenhoOmComponent } from './nota-empenho-om.component';

describe('NotaEmpenhoOmComponent', () => {
  let component: NotaEmpenhoOmComponent;
  let fixture: ComponentFixture<NotaEmpenhoOmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaEmpenhoOmComponent]
    });
    fixture = TestBed.createComponent(NotaEmpenhoOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
