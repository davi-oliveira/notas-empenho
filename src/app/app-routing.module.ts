import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadContratoComponent } from './components/cad-contrato/cad-contrato.component';
import { AppComponent } from './app.component';
import { CadItemComponent } from './components/cad-item/cad-item.component';
import { CadOMComponent } from './components/cad-om/cad-om.component';
import { NotaEmpenhoComponent } from './components/nota-empenho/nota-empenho.component';
import { NotaEmpenhoOmComponent } from './components/nota-empenho-om/nota-empenho-om.component';
import { UtilizacaoEmpenhoComponent } from './components/utilizacao-empenho/utilizacao-empenho.component';
import { ItemNotaEmpenhoComponent } from './components/item-nota-empenho/item-nota-empenho.component';

const routes: Routes = [
  {path: 'cadContrato', component: CadContratoComponent},
  {path: 'cadItem', component: CadItemComponent},
  {path: 'cadOM', component: CadOMComponent},
  {path: 'cadNotaEmpenho', component: NotaEmpenhoComponent},
  {path: 'notaEmpenhoOM', component: NotaEmpenhoOmComponent},
  {path: 'utilizacaoEmpenho', component: UtilizacaoEmpenhoComponent},
  {path: 'itemNotaEmpenho/:notaId', component: ItemNotaEmpenhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
