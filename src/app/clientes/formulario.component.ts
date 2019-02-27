import { Component, OnInit } from '@angular/core';
import { client } from './cliente';
import { clientService } from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'

import swal from 'sweetalert2'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  private client: client = new client()
  private titulo: string = "Crear client"
  private errores: string[];

  constructor(private clientService: clientService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarclient()
  }

  cargarclient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clientService.getclient(id).subscribe((client) => this.client = client)
      }
    })
  }

  public create(): void{
    //console.log("Clicked!")
    //console.log(this.client)
    this.clientService.create(this.client).subscribe(
      json => {
        this.router.navigate(['/clients/page/0'])
        swal('New client', `${json.mensaje}: ${json.client.name}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código error: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.clientService.update(this.client).subscribe(
      client => { this.router.navigate(['/clientes/page/0'])
      swal('Client Updated',`The client ${client.name} has been updated successfully!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Error code: ' + err.status);
        console.error(err.error.errors);
      }
    )

  }
  cancel(): void{
    this.router.navigate(['/clients/page/0'])
  }

}
