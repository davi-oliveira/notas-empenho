import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-cad-contrato',
  templateUrl: './cad-contrato.component.html',
  styleUrls: ['./cad-contrato.component.css'],
})
export class CadContratoComponent implements OnInit {
  ngOnInit(): void { }

  numCont: number = 0;
  ano: number = 0;
  desc: String = '';
  verbo: String = 'cadastrar';

  contratos: Contrato[] = [];

  constructor(private listService: ListService) {
    this.getContratos();
  }

  //================= ELEMENTOS DOM ============//
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
  //================= FIM ELEMENTOS DOM ========//

  //================ VALIDAÇÕES ================//
  validNumCont() {
    if (this.contExists(this.numCont)) {
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
  //============= FIM VALIDAÇÕES =================//

  //============= OPERAÇÕES =====================//
  getContratos(): void {
    this.listService
      .getCtn()
      .subscribe((contratos) => (this.contratos = contratos));
  }

  cadastrar() {
    if (!this.validNumCont() || !this.validAnoCont()) return;

    let newCont: Contrato = {
      numero_contrato: this.numCont,
      ano: this.ano,
      descricao: this.desc,
    };

    this.listService.cadContrato(newCont.descricao != '' ? newCont : { ...newCont, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"

    setTimeout(() => this.getContratos(), 500); //atualizar a lista após adicionado
    this.clearForm();
    this.closeCadCont();
  }

  openCadCont() {
    setTimeout(() => {
      this.divCont.nativeElement.classList.remove('d-none');
      this.tableConts.nativeElement.classList.add('transparencia', 'tabEsc');
      this.btnsCont.nativeElement.classList.add('d-none');
    });
  }

  closeCadCont() {
    setTimeout(() => {
      this.divCont.nativeElement.classList.add('d-none');
      this.tableConts.nativeElement.classList.remove('transparencia', 'tabEsc');
      this.btnsCont.nativeElement.classList.remove('d-none');
    });
  }

  excluir(contrato: Contrato) { }

  editar(contrato: Contrato) { }

  clearForm() {
    this.numCont = 0;
    this.ano = 0;
    this.desc = '';
  }

  //============= FIM OPERAÇÕES ===================//
}
