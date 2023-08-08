import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService as NotaOmService } from 'src/app/services/nota-empenho-om/list.service';
import { ListService as OmService } from 'src/app/services/om/list.service';
import { ListService as ItemService } from 'src/app/services/itens-service/list.service';
import { ListService as ItemNotaService } from 'src/app/services/item-nota/list.service';
import { ActivatedRoute } from '@angular/router';
import { OM } from 'src/app/interfaces/OM';
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
  item_nota_numero!: Number;

  utilizacaoNota: Utilizacao[] = [];
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
  @ViewChild('selectItem', { static: false }) selectItem!: ElementRef;

  @ViewChild('selectOm', { static: false }) selectOm!: ElementRef;

  @ViewChild('inputQtdUtilizada', { static: false }) inputQtdUtilizada!: ElementRef;

  @ViewChild('inputNotaFiscal', { static: false }) inputNotaFiscal!: ElementRef;

  //---------------- Operações --------------------//

  refreshInfos() {
    this.getOm();
    this.getItens();
    this.getItensNota();
    this.getUtilizacao();
  }

  getUtilizacao(): void {
    this.listService
      .getNotaOm()
      .subscribe((notasOm) => {
        this.utilizacaoNota = notasOm.filter((notaOm) => {
          this.searchItemNotaEmpenho(notaOm.item_nota_empenho_id)!.empenho_numero == this.nota
        })
      })
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

  getItem(numeroItem: Number | undefined): Item | undefined {
    return this.itens.find((item) => item.numero_item == numeroItem)
  }

  async getItensNota() {
    await this.itemNotaService
      .getItensNota()
      .subscribe((itensNota) => {
        this.itensNota = itensNota.filter((itemNota) => itemNota.empenho_numero == this.nota)
      })

    console.log('itens nota no getitensnota: ', this.itensNota)
  }

  searchOm(numero: Number): OM | undefined {
    return this.om.find((om) => om.id == numero)
  }

  searchItemNotaEmpenho(id: Number | undefined): ItemNota | undefined {
    console.log("itens nota antes: ", this.itensNota)
    setTimeout(() => console.log("itens nota depois: ", this.itensNota), 2000);
    return this.itensNota.find((itemNota) => itemNota.id == id)
  }

  searchItemByItemNota(itemNota: ItemNota | undefined): Item | undefined {
    return this.getItem(itemNota?.item_numero)
  }

  searchItemByNotaOm(notaOm: Utilizacao): Item | undefined {
    console.log(notaOm)
    let itemNota = this.searchItemNotaEmpenho(notaOm.id);
    return this.searchItemByItemNota(itemNota);
  }

  cadOmInNota() {
    if (this.selectItem.nativeElement.value == "no-selected") return;

    let utilizacaoToCad: Utilizacao = {
      id: this.id,
      item_nota_empenho_id: this.item_nota_numero,
      qtd_utilizada: this.qtdUtilizada,
      om_id: this.selectOm.nativeElement.value,
      nota_fiscal: this.nota_fiscal
    }

    console.log(utilizacaoToCad)

    if (this.operacao == 'Adicionar') {
      this.listService.cadNotaOm(utilizacaoToCad);
    }
    else if (this.operacao == 'Editar') {
      this.listService.editNotaOm(utilizacaoToCad);
    }

    setTimeout(() => this.getUtilizacao(), 500);
    this.clearForm();
  }

  excluir(notaOm: Utilizacao) {
    if (notaOm) {
      this.listService.deleteNotaOm(notaOm);
      setTimeout(() => {
        this.getUtilizacao();
      }, 500);
    }
  }

  editar(notaOm: Utilizacao) {
    this.operacao = 'Editar'
    this.id = Number(notaOm.id);
    this.item_nota_numero = notaOm.item_nota_empenho_id;
    this.selectItem.nativeElement.value = this.searchItemNotaEmpenho(notaOm.item_nota_empenho_id)?.item_numero;


    this.inputQtdUtilizada.nativeElement.value = notaOm.qtd_utilizada;
    this.selectOm.nativeElement.value = Number(notaOm.om_id);
    this.inputNotaFiscal.nativeElement.value = notaOm.nota_fiscal;
  }

  clearForm() {
    this.selectItem.nativeElement.value = "no-selected";
    this.selectOm.nativeElement.value = "no-selected";
    this.inputQtdUtilizada.nativeElement.value = 0;
    this.inputNotaFiscal.nativeElement.value = '';

    this.operacao = 'Adicionar'
  }
}
