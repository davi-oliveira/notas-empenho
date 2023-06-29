import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { Contrato } from 'src/app/interfaces/Contrato';

@Component({
  selector: 'app-cad-contrato',
  templateUrl: './cad-contrato.component.html',
  styleUrls: ['./cad-contrato.component.css']
})
export class CadContratoComponent implements OnInit {

  ngOnInit(): void {
    
  }

  //================= ELEMENTOS DOM ============//
  @ViewChild('divCont', {static: false})
  divCont!: ElementRef;

  @ViewChild('tableConts', {static: false})
  tableConts!: ElementRef;

  @ViewChild('btnCadCont', {static: false})
  btnCadCont!: ElementRef;
  //================= FIM ELEMENTOS DOM ========//

  numCont: number = 0;
  ano: number = 0;
  desc: String = "";

  contratos: Contrato[] = [];

  constructor(private listService: ListService){
    this.getContratos();
  }

  getContratos(): void{
    this.listService.getAll().subscribe((contratos) => (this.contratos = contratos));
  }

  cadastrar(){
    let newCont: Contrato = {numero_contrato: this.numCont, ano: this.ano, descricao: this.desc}; 
    this.listService.cadContrato(newCont)
    this.contratos.push(newCont)
    this.clearForm();
    this.closeCadCont();
  }

  openCadCont(){
    setTimeout(() => {
      this.divCont.nativeElement.classList.remove("d-none");
      this.tableConts.nativeElement.classList.add("opacity-25");
      this.btnCadCont.nativeElement.classList.add("d-none");
    })
  }

  closeCadCont(){
    setTimeout(() => {
      this.divCont.nativeElement.classList.add("d-none");
      this.tableConts.nativeElement.classList.remove("opacity-25");
      this.btnCadCont.nativeElement.classList.remove("d-none");
    })
  }

  excluir(contrato: Contrato){

  }

  editar(contrato: Contrato){

  }

  clearForm(){
    this.numCont = 0;
    this.ano = 0;
    this.desc = "";
  }

}
