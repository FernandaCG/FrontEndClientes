import { Component, OnInit, Inject } from '@angular/core';
import { client } from './cliente'
import { clientService } from './cliente.service'
import swal from 'sweetalert2'
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class clientsComponent implements OnInit {

  clients: client[];
  paginador: any;
  clienteEdit: client = new client()
  private client: client = new client()
  private errores: string[];

  constructor(private clientService: clientService,
  private activatedRoute: ActivatedRoute) { }

//Cuando se inicia el componente
  ngOnInit() {
    //getclients es observado, donde los parametros es lo que cambia el observador
    this.activatedRoute.paramMap.subscribe( params => {
      //Cada que hay un clic en las paginas, se actualiza el listado clientes
      //Siempre mantiene la misma instancia, por eso es necesario el observable
    let page: number = +params.get('page');
    if(!page){
      page = 0;
    }
    this.clientService.getclients(page).pipe(
      tap(response => {
        console.log('clientComponent: tap3');
        (response.content as client[]).forEach( client => {
        console.log(client.name);
        });
        console.log('valor'+params.get('valor'));
      })
    ).subscribe(
      //funcion anonima, funcion de typescript
      //argumento---funcion
      response => {
        this.clients = response.content as client[];
        this.paginador = response;
      }
    );
    }
  );
  }

  delete(client: client): void {

    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })

  swalWithBootstrapButtons({
    title: 'Are you sure?',
    text: `Are you sure that you want to delete the client ${client.name}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.clientService.delete(client.id).subscribe(
        response => {
          this.clients = this.clients.filter(cli => cli !== client)
          swalWithBootstrapButtons(
            'Deleted',
            `The client ${client.name} has been deleted successfully`,
            'success'
          )
        }
      )

    }
    })
  }

  update(): void {
    this.clientService.update(this.client).subscribe(
      client => {
      swal('Client Updated',`The client ${client.name} has been updated successfully!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Error code: ' + err.status);
        console.error(err.error.errors);
      }
    )

  }
///////////////////
  updt(client: client): void{
    this.clienteEdit = client;
    console.log('nombre '+ this.clienteEdit.name)
  }

  updateClient(): void{
    this.clientService.update(this.clienteEdit).subscribe(
      client => {
      swal('Client Updated',`The client ${this.clienteEdit.name} has been updated successfully!`, 'success')
      }
    )
  }
///
}
