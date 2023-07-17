import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CadContratoComponent } from './components/cad-contrato/cad-contrato.component';
import { CadItemComponent } from './components/cad-item/cad-item.component';
import { CadOMComponent } from './components/cad-om/cad-om.component';
import { NotaEmpenhoComponent } from './components/nota-empenho/nota-empenho.component';
import { NotaEmpenhoOmComponent } from './components/nota-empenho-om/nota-empenho-om.component';
import { UtilizacaoEmpenhoComponent } from './components/utilizacao-empenho/utilizacao-empenho.component';
import { ItemNotaEmpenhoComponent } from './components/item-nota-empenho/item-nota-empenho.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    CadContratoComponent,
    CadItemComponent,
    CadOMComponent,
    NotaEmpenhoComponent,
    NotaEmpenhoOmComponent,
    UtilizacaoEmpenhoComponent,
    ItemNotaEmpenhoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
