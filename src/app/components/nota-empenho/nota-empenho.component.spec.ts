import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEmpenhoComponent } from './nota-empenho.component';

describe('NotaEmpenhoComponent', () => {
  let component: NotaEmpenhoComponent;
  let fixture: ComponentFixture<NotaEmpenhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaEmpenhoComponent]
    });
    fixture = TestBed.createComponent(NotaEmpenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
