import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CadContratoComponent } from './components/cad-contrato/cad-contrato.component';
import { CadItemComponent } from './components/cad-item/cad-item.component';
import { CadOMComponent } from './components/cad-om/cad-om.component';
import { NotaEmpenhoComponent } from './components/nota-empenho/nota-empenho.component';
import { NotaEmpenhoOmComponent } from './components/nota-empenho-om/nota-empenho-om.component';
import { ItemNotaEmpenhoComponent } from './components/item-nota-empenho/item-nota-empenho.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MessageComponent } from './components/message/message.component';
import { GenTokenService } from './services/generate-token/gen.token.service';
import { CadMilitarComponent } from './components/cad-militar/cad-militar.component';

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
    ItemNotaEmpenhoComponent,
    LoginComponent,
    LoginPageComponent,
    MessageComponent,
    CadMilitarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: GenTokenService, multi: true}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
