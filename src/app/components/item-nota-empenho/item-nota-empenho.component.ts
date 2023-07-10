import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from 'src/app/services/item-nota/list.service';
import { ListService as ItemService } from 'src/app/services/itens-service/list.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/Item';
import { ItemNota } from 'src/app/interfaces/ItemNota';
import { NotaEmpenho } from 'src/app/interfaces/NotaEmpenho';

@Component({
  selector: 'app-item-nota-empenho',
  templateUrl: './item-nota-empenho.component.html',
  styleUrls: ['./item-nota-empenho.component.css']
})
export class ItemNotaEmpenhoComponent implements OnInit {
  id: Number = 0;
  nota: Number = 0;

  itemNotas: ItemNota[] = [];
  itens: Item[] = [];

  qtdEmpenho!: Number;

  constructor(private route: ActivatedRoute, private itemListService: ItemService, private listService: ListService) {
    this.getItemNotas();
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
  getItemNotas(): void{
    this.listService
      .getItensNota()
      .subscribe((itemNotas) => (this.itemNotas = itemNotas))
  }
  getItens(): void {
    this.itemListService
      .getItens()
      .subscribe((itens) => (this.itens = itens));
  }

  searchItem(numero: Number): Item | undefined{
    return this.itens.find((item) => item.numero_item == numero)
  }

  cadItemInNota(){
    if(this.selectItem.nativeElement.value == "no-selected") return;
    
    console.log("item cadastrado" + this.selectItem.nativeElement.value)

    let itemToCad: ItemNota = {
      id: this.id,
      empenho_numero: this.nota,
      item_numero: this.selectItem.nativeElement.value,
      qtd_empenho: this.qtdEmpenho
    }
  }

  excluir(itemNota: ItemNota){
    if(itemNota){
      this.listService.deleteItemNota(itemNota);
      setTimeout(() => {
        this.getItemNotas();
      }, 500);
    }
  }

  editar(itemNota: ItemNota){
    this.selectItem.nativeElement.value = itemNota.item_numero;
    this.qtdEmpenho = itemNota.qtd_empenho;
  }
}
