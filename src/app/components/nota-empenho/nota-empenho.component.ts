import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/nota-empenho/list.service';
import { ListService as ContratoListService } from 'src/app/services/contratos-service/list.service';
import { NotaEmpenho } from 'src/app/interfaces/NotaEmpenho';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-nota-empenho',
  templateUrl: './nota-empenho.component.html',
  styleUrls: ['./nota-empenho.component.css']
})
export class NotaEmpenhoComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private listService: ListService, private ctnListService: ContratoListService) {
    this.getNotas();
  }

  notas: NotaEmpenho[] = [];
  contratos: Contrato[] = [];

  numNota: Number = 0;
  desc: String = '';
  ano: Number = 0;
  contrato: Number = 0;

  operacao: String = 'Cadastrar';
  lastInfo: any = { message: '', icon: '' };

  //-------------- Elementos DOM ---------//
  @ViewChild('divNota', { static: false })
  divNota!: ElementRef;

  @ViewChild('tableNotas', { static: false })
  tableNotas!: ElementRef;

  @ViewChild('btnsNota', { static: false })
  btnsNota!: ElementRef;

  @ViewChild('inputNumNota', { static: false })
  inputNumNota!: ElementRef;

  @ViewChild('divInfo', { static: false })
  divInfo!: ElementRef;

  @ViewChild('iconMsg', { static: false })
  iconMsg!: ElementRef;

  @ViewChild('inputOptionCto', { static: false })
  inputOptionCto!: ElementRef;

  //--------------- Validações ---------------//
  validNumNota() {
    if (this.notaExists(this.numNota) && this.operacao == 'Cadastrar') {
      this.inputNumNota.nativeElement.classList.add('is-invalid');
      return false;
    } else {
      this.inputNumNota.nativeElement.classList.remove('is-invalid');
      return true;
    }
  }

  notaExists(notaNumber: Number): NotaEmpenho | undefined {
    return this.notas.find(
      (nota) => notaNumber == nota.numero
    );
  }

  //---------------- Operações --------------------//
  getNotas(): void {
    this.listService
      .getNotas()
      .subscribe((notas) => (this.notas = notas));

    this.ctnListService
      .getCtn()
      .subscribe((contratos) => (this.contratos = contratos));
  }

  cadastrar() {
    if (this.operacao == 'Cadastrar' && !this.validNumNota()) return;

    let newNota: NotaEmpenho = {
      numero: this.numNota,
      descricao: this.desc,
      ano: this.ano,
      numero_contrato: this.inputOptionCto.nativeElement.value
    };

    if (this.operacao == 'Cadastrar') {
      this.listService.cadNota(newNota.descricao != '' ? newNota : { ...newNota, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"
      this.activeInfoBox(`Nota <strong>${newNota.numero}</strong> criada com sucesso!`, "new", "folder-plus");
    }
    else if (this.operacao == 'Editar') {
      this.listService.editNota(newNota.descricao != '' ? newNota : { ...newNota, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"
      this.activeInfoBox(`Nota <strong>${newNota.numero}</strong> editada com sucesso!`, "edit", "info-circle");
    }

    setTimeout(() => this.getNotas(), 500); //atualizar a lista após adicionado
    this.clearForm();
    this.closeCadNota();
  }

  openCadNota() {
    setTimeout(() => {
      this.disableInfoBox();
      this.divNota.nativeElement.classList.remove('d-none');
      this.tableNotas.nativeElement.classList.add('transparencia');
      this.btnsNota.nativeElement.classList.add('d-none');
    });
  }

  closeCadNota() { 
    setTimeout(() => {
      this.divNota.nativeElement.classList.add('d-none');
      this.tableNotas.nativeElement.classList.remove('transparencia');
      this.btnsNota.nativeElement.classList.remove('d-none');
      this.operacao = "Cadastrar";
      this.inputNumNota.nativeElement.disabled = false;
      this.clearForm();
    });
  }

  excluir(nota: NotaEmpenho) {
    if (nota) {
      this.listService.deleteNota(nota);
      setTimeout(() => {
        this.getNotas()
        this.activeInfoBox(`Nota <strong>${nota.numero}</strong> excluido!`, "delete", "trash");
      }, 500); //atualizar a lista após excluido
    }
  }

  editar(nota: NotaEmpenho) {
    this.openCadNota();
    this.operacao = 'Editar';

    this.numNota = nota.numero;
    this.desc = nota.descricao;
    this.ano = nota.ano;
    this.inputOptionCto.nativeElement.value = nota.numero_contrato;

    this.inputNumNota.nativeElement.disabled = true;
  }

  infoItem(){
    console.log('info do item')
  }

  clearForm() {
    this.numNota = 0;
    this.desc = '';
    this.ano = 0;
    this.contrato = 0;
  }

  activeInfoBox(message: String, type: "delete" | "edit" | "new", icon: String) {
    if (type == "delete") {
      this.divInfo.nativeElement.classList.remove('alert-primary', 'alert-success');
      this.divInfo.nativeElement.classList.add('alert-danger');
    }
    else if (type == "edit") {
      this.divInfo.nativeElement.classList.remove('alert-danger', 'alert-success');
      this.divInfo.nativeElement.classList.add('alert-primary');
    }

    else if (type == "new") {
      this.divInfo.nativeElement.classList.remove('alert-danger', 'alert-primary');
      this.divInfo.nativeElement.classList.add('alert-success');
    }

    this.divInfo.nativeElement.classList.remove('opacity-0');
    this.lastInfo = { message, icon }
  }

  disableInfoBox() {
    this.divInfo.nativeElement.classList.add('opacity-0');
  }
}
