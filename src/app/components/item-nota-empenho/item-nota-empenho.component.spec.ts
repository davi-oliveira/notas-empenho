import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNotaEmpenhoComponent } from './item-nota-empenho.component';

describe('ItemNotaEmpenhoComponent', () => {
  let component: ItemNotaEmpenhoComponent;
  let fixture: ComponentFixture<ItemNotaEmpenhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemNotaEmpenhoComponent]
    });
    fixture = TestBed.createComponent(ItemNotaEmpenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
