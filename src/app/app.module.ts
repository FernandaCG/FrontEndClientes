import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { clientsComponent } from './clientes/clientes.component'
import { clientService } from './clientes/cliente.service'

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormularioComponent } from './clientes/formulario.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { FormsModule } from '@angular/forms';



const routes: Routes = [
  {path: ' ', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clients', component: clientsComponent},
  {path: 'clients/page/:page', component: clientsComponent},
  {path: 'clients/formulario', component: FormularioComponent},
  {path: 'clients/formulario/:id', component: FormularioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    clientsComponent,
    FormularioComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [clientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
