import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/om/list.service';
import { OM } from 'src/app/interfaces/OM';

@Component({
  selector: 'app-cad-om',
  templateUrl: './cad-om.component.html',
  styleUrls: ['./cad-om.component.css']
})

export class CadOMComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private listService: ListService) {
    this.getOm();
  }

  om: OM[] = [];

  idOm: Number | undefined = 0;
  nomeOm: String = "";

  operacao: String = 'Cadastrar';
  lastInfo: any = { message: '', icon: '' };

  //-------------- Elementos DOM ---------//
  @ViewChild('divOm', { static: false })
  divOm!: ElementRef;

  @ViewChild('tableOm', { static: false })
  tableOm!: ElementRef;

  @ViewChild('btnsOm', { static: false })
  btnsOm!: ElementRef;

  @ViewChild('inputNomeOm', { static: false })
  inputNomeOm!: ElementRef;

  @ViewChild('divInfo', { static: false })
  divInfo!: ElementRef;

  @ViewChild('iconMsg', { static: false })
  iconMsg!: ElementRef;

  //--------------- Validações ---------------//
  validNomeOM() {
    if (this.omExists(this.nomeOm) && this.operacao == 'Cadastrar') {
      this.inputNomeOm.nativeElement.classList.add('is-invalid');
      return false;
    } else {
      this.inputNomeOm.nativeElement.classList.remove('is-invalid');
      return true;
    }
  }

  omExists(omName: String): OM | undefined {
    return this.om.find(
      (om) => this.nomeOm == om.nome
    );
  }

  //--------------- Operações ----------------//
  getOm(): void {
    this.listService
      .getOm()
      .subscribe((om) => (this.om = om.content));
  }

  cadastrar() {
    if (this.operacao == 'Cadastrar' && !this.validNomeOM()) return;

    let newOm: OM = { id: this.idOm, nome: this.nomeOm };

    if (this.operacao == 'Cadastrar') {
      this.listService.cadOm(newOm);
      this.activeInfoBox(`OM <strong>${newOm.nome}</strong> criada com sucesso!`, "new", "folder-plus");
    }
    else if (this.operacao == 'Editar') {
      this.listService.editOm(newOm);
      this.activeInfoBox(`Contrato <strong>${newOm.nome}</strong> editada com sucesso!`, "edit", "info-circle");
    }

    setTimeout(() => this.getOm(), 500); //atualizar a lista após adicionado
    this.clearForm();
    this.closeCadOm();
  }

  openCadOm() {
    setTimeout(() => {
      if(this.operacao != 'Editar'){
        if(this.om.length != 0)
          this.idOm = Number(this.om[this.om.length-1].id)+1;
        
        else this.idOm = 1;
      }

      this.disableInfoBox();
      this.divOm.nativeElement.classList.remove('d-none');
      this.tableOm.nativeElement.classList.add('transparencia');
      this.btnsOm.nativeElement.classList.add('d-none');
    });
  }

  closeCadOm() {
    setTimeout(() => {
      this.divOm.nativeElement.classList.add('d-none');
      this.tableOm.nativeElement.classList.remove('transparencia');
      this.btnsOm.nativeElement.classList.remove('d-none');
      this.inputNomeOm.nativeElement.classList.remove('is-invalid');
      this.operacao = "Cadastrar";
      this.clearForm();
    });
  }

  excluir(om: OM) {
    if (om) {
      this.listService.deleteOm(om);
      setTimeout(() => {
        this.getOm()
        this.activeInfoBox(`Contrato <strong>${om.nome}</strong> excluido!`, "delete", "trash");
      }, 500); //atualizar a lista após excluido
    }
  }

  editar(om: OM) {
    this.openCadOm();
    this.operacao = 'Editar';

    this.idOm = om.id;
    this.nomeOm = om.nome;
  }

  clearForm() {
    this.nomeOm = "";
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
