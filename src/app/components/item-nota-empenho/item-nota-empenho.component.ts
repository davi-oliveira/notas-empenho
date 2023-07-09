import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService as ItemService } from 'src/app/services/itens-service/list.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/Item';
import { ItemNota } from 'src/app/interfaces/ItemNota';

@Component({
  selector: 'app-item-nota-empenho',
  templateUrl: './item-nota-empenho.component.html',
  styleUrls: ['./item-nota-empenho.component.css']
})
export class ItemNotaEmpenhoComponent implements OnInit {
  id: Number = 0;
  nota: Number = 0;
  itens: Item[] = [];

  qtdEmpenho: Number = 0;

  constructor(private route: ActivatedRoute, private itemListService: ItemService) {
    this.getItens();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nota = params['notaId'];
    });
  }

  //-------------- Elementos DOM ---------//
  @ViewChild('selectItem', { static: false })
  selectItem!: ElementRef;

  //---------------- Operações --------------------//
  getItens(): void {
    this.itemListService
      .getItens()
      .subscribe((itens) => (this.itens = itens));
  }

  cadItemInNota(){
    console.log("item cadastrado" + this.selectItem.nativeElement.value)
  }
}
