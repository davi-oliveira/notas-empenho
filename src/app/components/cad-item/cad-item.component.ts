import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/itens-service/list.service';
import { Item } from 'src/app/interfaces/Item';

@Component({
  selector: 'app-cad-item',
  templateUrl: './cad-item.component.html',
  styleUrls: ['./cad-item.component.css']
})


export class CadItemComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private listService: ListService) {
    this.body = document.getElementsByTagName('body')[0];
    this.getItens();
  }

  itens: Item[] = [];
  itensSearch: Item[] = [];

  body: any;

  numItem: Number = 0;
  nomeItem: String = '';
  desc: String = '';
  valor: string = '0';
  und_md: String = 'unselect';

  operacao: String = 'Cadastrar';
  lastInfo: any = { message: '', icon: '' };

  //-------------- Elementos DOM ---------//
  @ViewChild('divItem', { static: false })
  divItem!: ElementRef;

  @ViewChild('tableItens', { static: false })
  tableItens!: ElementRef;

  @ViewChild('btnsItem', { static: false })
  btnsItem!: ElementRef;

  @ViewChild('inputNumItem', { static: false })
  inputNumItem!: ElementRef;

  @ViewChild('divInfo', { static: false })
  divInfo!: ElementRef;

  @ViewChild('iconMsg', { static: false })
  iconMsg!: ElementRef;

  //--------------- Validações ---------------//
  validNumItem() {
    if (this.itemExists(this.numItem) && this.operacao == 'Cadastrar') {
      this.inputNumItem.nativeElement.classList.add('is-invalid');
      return false;
    } else {
      this.inputNumItem.nativeElement.classList.remove('is-invalid');
      return true;
    }
  }

  itemValue(item: Item) { //deixar o valor do item com 2 casas decimais
    return parseFloat(item.valor).toFixed(2).replace(",", ".")
  }

  itemExists(itemNumber: Number): Item | undefined {
    return this.itens.find(
      (item) => itemNumber == item.numero_item
    );
  }

  refreshItensSearch(event: any) {
    this.itensSearch = this.itens.filter((item) => item.nome.toUpperCase().includes(event.target.value.toUpperCase()) || item.descricao.toUpperCase().includes(event.target.value.toUpperCase()))
  }

  //---------------- Operações --------------------//
  getItens(): void {
    this.listService
      .getItens()
      .subscribe((itens) => {
        this.itens = itens.content;
        this.itensSearch = itens.content
      });
  }

  cadastrar() {
    if (this.operacao == 'Cadastrar' && !this.validNumItem()) return;

    let newItem: Item = {
      numero_item: this.numItem,
      nome: this.nomeItem,
      descricao: this.desc,
      valor: this.valor.replace(",", "."),
      und_md: this.und_md
    };

    if (this.operacao == 'Cadastrar') {
      this.listService.cadItem(newItem.descricao != '' ? newItem : { ...newItem, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"
      this.activeInfoBox(`Item <strong>${newItem.numero_item}</strong> criado com sucesso!`, "new", "folder-plus");
    }
    else if (this.operacao == 'Editar') {
      this.listService.editItem(newItem.descricao != '' ? newItem : { ...newItem, descricao: 'N/D' }); //se a descrição estiver vazia envia um "N/D"
      this.activeInfoBox(`Item <strong>${newItem.numero_item}</strong> editado com sucesso!`, "edit", "info-circle");
    }

    setTimeout(() => this.getItens(), 500); //atualizar a lista após adicionado
    this.clearForm();
    this.closeCadItem();
  }

  openCadItem() {
    setTimeout(() => {
      this.disableInfoBox();
      this.divItem.nativeElement.classList.remove('d-none');
      this.tableItens.nativeElement.classList.add('transparencia');
      this.btnsItem.nativeElement.classList.add('d-none');
      this.body.style.overflow = "hidden";
      document.getElementById('searchByItem')?.classList.add('d-none')
    });
  }

  closeCadItem() {
    setTimeout(() => {
      this.divItem.nativeElement.classList.add('d-none');
      this.tableItens.nativeElement.classList.remove('transparencia');
      this.btnsItem.nativeElement.classList.remove('d-none');
      this.inputNumItem.nativeElement.classList.remove('is-invalid');
      this.operacao = "Cadastrar";
      this.inputNumItem.nativeElement.disabled = false;
      this.body.style.overflow = "scroll";
      document.getElementById('searchByItem')?.classList.remove('d-none')
      this.clearForm();
    });
  }

  excluir(item: Item) {
    if (item) {
      this.listService.deleteItem(item);
      setTimeout(() => {
        this.getItens()
        this.activeInfoBox(`Item <strong>${item.numero_item}</strong> excluido!`, "delete", "trash");
      }, 500); //atualizar a lista após excluido
    }
  }

  editar(item: Item) {
    this.openCadItem();
    this.operacao = 'Editar';

    this.numItem = item.numero_item;
    this.nomeItem = item.nome;
    this.desc = item.descricao;
    this.valor = item.valor;
    this.und_md = item.und_md;

    this.inputNumItem.nativeElement.disabled = true;
  }

  clearForm() {
    this.numItem = 0;
    this.nomeItem = '';
    this.desc = '';
    this.valor = '0';
    this.und_md = 'unselect';
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
