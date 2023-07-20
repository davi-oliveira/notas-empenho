import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService as NotaOmService } from 'src/app/services/nota-empenho-om/list.service';
import { ListService as OmService } from 'src/app/services/om/list.service';
import { ListService as ItemService } from 'src/app/services/itens-service/list.service';
import { ListService as ItemNotaService } from 'src/app/services/item-nota/list.service';
import { ActivatedRoute } from '@angular/router';
import { OM } from 'src/app/interfaces/OM';
import { NotaOM } from 'src/app/interfaces/NotaOM';
import { Item } from 'src/app/interfaces/Item';
import { ItemNota } from 'src/app/interfaces/ItemNota';
import { Utilizacao } from 'src/app/interfaces/Utilizacao';

@Component({
  selector: 'app-nota-empenho-om',
  templateUrl: './nota-empenho-om.component.html',
  styleUrls: ['./nota-empenho-om.component.css']
})
export class NotaEmpenhoOmComponent implements OnInit {
  id: Number = 0;
  nota: Number = 0;
  empenho_numero: Number = 0;
  om_id: Number = 0;
  qtdUtilizada!: Number;
  nota_fiscal!: String;

  notasOm: Utilizacao[] = [];
  om: OM[] = [];
  itens: Item[] = [];
  itensNota: ItemNota[] = [];

  operacao: String = 'Adicionar';

  constructor(private route: ActivatedRoute, private listService: NotaOmService, private omService: OmService, private itemService: ItemService, private itemNotaService: ItemNotaService) {
    this.refreshInfos()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nota = params['notaId'];
    });
  }

  //-------------- Elementos DOM ---------//
  @ViewChild('selectItem', { static: false })
  selectItem!: ElementRef;

  @ViewChild('selectOm', { static: false })
  selectOm!: ElementRef;


  //---------------- Operações --------------------//

  refreshInfos(): void{
    this.getNotasOm();
    this.getOm();
    this.getItens();
    this.getItensNota();
  }
  getNotasOm(): void {
    this.listService
      .getNotaOm()
      .subscribe((notasOm) => (this.notasOm = notasOm))
  }
  getOm(): void {
    this.omService
      .getOm()
      .subscribe((om) => (this.om = om))
  }

  getItens(): void {
    this.itemService
      .getItens()
      .subscribe((itens) => (this.itens = itens))
  }

  getItem(numeroItem: Number | undefined): Item | undefined{
    return this.itens.find((item) => item.numero_item == numeroItem)
  }

  getItensNota(): void{
    this.itemNotaService
      .getItensNota()
      .subscribe((itensNota) => (this.itensNota = itensNota.filter((itemNota) => itemNota.empenho_numero == this.nota)))
  }

  searchOm(numero: Number): OM | undefined {
    return this.om.find((om) => om.id == numero)
  }

  searchItemNotaEmpenho(id: Number | undefined) : ItemNota | undefined {
    return this.itensNota.find((itemNota) => itemNota.id == id)
  }

  searchItemByItemNota(itemNota: ItemNota | undefined) : Item | undefined{
    return this.getItem(itemNota?.item_numero)
  }

  searchItemByNotaOm(notaOm: Utilizacao) : Item | undefined{
    console.log(notaOm)
    let itemNota = this.searchItemNotaEmpenho(notaOm.id);
    return this.searchItemByItemNota(itemNota);
  }

  teste(notaOm: Utilizacao){
    console.log(this.searchItemByNotaOm(notaOm)?.nome)
    console.log(notaOm.item_nota_empenho_id)
    console.log(this.searchItemNotaEmpenho(notaOm.item_nota_empenho_id))
    console.log(this.getItem(this.searchItemNotaEmpenho(notaOm.item_nota_empenho_id)?.item_numero)?.nome)
    console.log("=====================")
  }

  cadOmInNota() {
    if (this.selectItem.nativeElement.value == "no-selected") return;

    console.log("item cadastrado" + this.selectItem.nativeElement.value)

    let notaOmToCad: Utilizacao = {
      id: this.id,
      item_nota_empenho_id: this.selectItem.nativeElement.value,
      qtd_utilizada: this.qtdUtilizada,
      om_id: this.selectOm.nativeElement.value,
      nota_fiscal: this.nota_fiscal
    }

    if (this.operacao == 'Adicionar') {
      this.listService.cadNotaOm(notaOmToCad);
    }
    else if (this.operacao == 'Editar') {
      this.listService.editNotaOm(notaOmToCad);
    }

    setTimeout(() => this.getNotasOm(), 500);
    this.clearForm();
  }

  excluir(notaOm: Utilizacao) {
    if (notaOm) {
      this.listService.deleteNotaOm(notaOm);
      setTimeout(() => {
        this.getNotasOm();
      }, 500);
    }
  }

  editar(notaOm: Utilizacao) {
    this.operacao = 'Editar'
    this.selectItem.nativeElement.value = notaOm.om_id;
    this.id = Number(notaOm.id);
  }

  cancelarEdicao() {
    this.operacao = 'Adicionar'
    this.clearForm()
  }

  clearForm() {
    this.selectItem.nativeElement.value = "no-selected";
  }
}
