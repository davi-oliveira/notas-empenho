import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/contratos-service/list.service';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-cad-contrato',
  templateUrl: './cad-contrato.component.html',
  styleUrls: ['./cad-contrato.component.css'],
})

export class CadContratoComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private listService: ListService) {
    this.getContratos();
  }

  contratos: Contrato[] = [];

  numCont: number = 0;
  ano: number = 0;
  desc: String = '';

  operacao: String = 'Cadastrar';
  lastInfo: any = { message: '', icon: '' };

  //-------------- Elementos DOM ---------//
  @ViewChild('divCont', { static: false })
  divCont!: ElementRef;

  @ViewChild('tableConts', { static: false })
  tableConts!: ElementRef;

  @ViewChild('btnsCont', { static: false })
  btnsCont!: ElementRef;

  @ViewChild('inputNumCont', { static: false })
  inputNumCont!: ElementRef;

  @ViewChild('anoCont', { static: false })
  anoCont!: ElementRef;

  @ViewChild('divInfo', { static: false })
  divInfo!: ElementRef;

  @ViewChild('iconMsg', { static: false })
  iconMsg!: ElementRef;

  //--------------- Validações ---------------//
  validNumCont() {
    if (this.contExists(this.numCont) && this.operacao == 'Cadastrar') {
      this.inputNumCont.nativeElement.classList.add('is-invalid');
      return false;
    } else {
      this.inputNumCont.nativeElement.classList.remove('is-invalid');
      return true;
    }
  }

  validAnoCont() {
    if (this.ano == 0 || String(this.ano).length != 4) {
      this.anoCont.nativeElement.classList.add('is-invalid');
      return false;
    } else {
      this.anoCont.nativeElement.classList.remove('is-invalid');
      return true;
    }
  }

  contExists(contNumber: number): Contrato | undefined {
    return this.contratos.find(
      (contrato) => contNumber == contrato.numero_contrato
    );
  }

  //--------------- Operações ----------------//
  getContratos(): void {
    this.listService
      .getCtn()
      .subscribe((contratos) => {
        this.contratos = contratos.content
      })
  }

  cadastrar() {
    if ((this.operacao == 'Cadastrar' && !this.validNumCont()) || !this.validAnoCont()) return;

    let newCont: Contrato = {
      numero_contrato: this.numCont,
      ano: this.ano,
      descricao: this.desc,
    };

    if (this.operacao == 'Cadastrar') {
      this.listService.cadContrato(newCont.descricao != '' ? newCont : { ...newCont, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"
      this.activeInfoBox(`Contrato <strong>${newCont.numero_contrato}</strong> criado com sucesso!`, "new", "folder-plus");
    }
    else if (this.operacao == 'Editar') {
      this.listService.editContrato(newCont.descricao != '' ? newCont : { ...newCont, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"
      this.activeInfoBox(`Contrato <strong>${newCont.numero_contrato}</strong> editado com sucesso!`, "edit", "info-circle");
    }

    setTimeout(() => this.getContratos(), 500); //atualizar a lista após adicionado
    this.clearForm();
    this.closeCadCont();
  }

  openCadCont() {
    setTimeout(() => {
      this.disableInfoBox();
      this.divCont.nativeElement.classList.remove('d-none');
      this.tableConts.nativeElement.classList.add('transparencia');
      this.btnsCont.nativeElement.classList.add('d-none');
    });
  }

  closeCadCont() {
    setTimeout(() => {
      this.divCont.nativeElement.classList.add('d-none');
      this.tableConts.nativeElement.classList.remove('transparencia');
      this.btnsCont.nativeElement.classList.remove('d-none');
      this.inputNumCont.nativeElement.classList.remove('is-invalid');
      this.anoCont.nativeElement.classList.remove('is-invalid');
      this.operacao = "Cadastrar";
      this.inputNumCont.nativeElement.disabled = false;
      this.clearForm();
    });
  }

  excluir(contrato: Contrato) {
    if (contrato) {
      this.listService.deleteCont(contrato);
      setTimeout(() => {
        this.getContratos()
        this.activeInfoBox(`Contrato <strong>${contrato.numero_contrato}</strong> excluido!`, "delete", "trash");
      }, 500); //atualizar a lista após excluido
    }
  }

  editar(contrato: Contrato) {
    this.openCadCont();
    this.operacao = 'Editar';

    this.numCont = contrato.numero_contrato;
    this.ano = contrato.ano;
    this.desc = contrato.descricao;

    this.inputNumCont.nativeElement.disabled = true;
  }

  clearForm() {
    this.numCont = 0;
    this.ano = 0;
    this.desc = '';
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
