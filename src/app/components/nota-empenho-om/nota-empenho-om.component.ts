import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService as NotaOmService } from 'src/app/services/nota-empenho-om/list.service';
import { ListService as OmService } from 'src/app/services/om/list.service';
import { ActivatedRoute } from '@angular/router';
import { OM } from 'src/app/interfaces/OM';
import { NotaOM } from 'src/app/interfaces/NotaOM';

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

  notasOm: NotaOM[] = [];
  om: OM[] = [];

  operacao: String = 'Adicionar';

  constructor(private route: ActivatedRoute, private listService: NotaOmService, private omService: OmService) {
    this.getNotasOm();
    this.getOm();
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
  getNotasOm(): void {
    this.listService
      .getNotaOm()
      .subscribe((notasOm) => (this.notasOm = notasOm.filter((notaOm) => notaOm.empenho_numero == this.nota)))
  }
  getOm(): void {
    this.omService
      .getOm()
      .subscribe((om) => (this.om = om))
  }

  searchOm(numero: Number): OM | undefined {
    return this.om.find((om) => om.id == numero)
  }

  cadOmInNota() {
    if (this.selectItem.nativeElement.value == "no-selected") return;

    console.log("item cadastrado" + this.selectItem.nativeElement.value)

    let notaOmToCad: NotaOM = {
      id: this.id,
      empenho_numero: this.nota,
      om_id: this.selectItem.nativeElement.value
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

  excluir(notaOm: NotaOM) {
    if (notaOm) {
      this.listService.deleteNotaOm(notaOm);
      setTimeout(() => {
        this.getNotasOm();
      }, 500);
    }
  }

  editar(notaOm: NotaOM) {
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
