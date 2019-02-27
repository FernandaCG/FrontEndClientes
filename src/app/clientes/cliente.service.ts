import { Injectable } from '@angular/core';
import { clientS } from './clientes.json';
import { client } from './cliente';

import { of, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import swal from 'sweetalert2';
import { Router } from '@angular/router';

//import { map } from 'rxjs/operators'

@Injectable()
export class clientService {

//Con el puerto distinto, funciona
  private urlEndPoint: string = 'http://localhost:4010/api/v1/client';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient, private router: Router) { }

  getclients(page: number): Observable<any> {
    //Observable convierte a Stream, basado en el patron de diseño Observable
    //donde tenemos un sujeto que es observable, client, y tenemos observadores que escuchan cambios en clients
    //cuando surge un cambio en el sujeto,se dispara una accion
    //return of(clientS);

    return this.http.get<client[]>(this.urlEndPoint + '/page/'+ page).pipe(
      tap((response: any) => {
        console.log('clientService : tap 1');
        (response.content as client[]).forEach( client => {
            console.log(client.name);
          }
        )
      }),
      map((response: any) => {
        (response.content as client[]).map(client => {
          client.name = client.name.toUpperCase();
          return client;
        });
        return response;
      }),
      tap(response => {
        console.log('clientService : tap 2');
        (response.content as client[]).forEach( client => {
            console.log(client.name);
          }
        )
      })
    );

    //return this.http.get<client[]>(this.urlEndPoint).pipe(
    //map( response => response as client[])
    //
    //);
   }

   create(client: client) : Observable<any> {
     return this.http.post<any>(this.urlEndPoint, client, {headers: this.httpHeaders}).pipe(
       catchError(e => {

         if(e.status == 400){
           return throwError(e);
         }

         console.error(e.error.mensaje);
         swal(e.error.mensaje, e.error.error, 'error')
         return throwError(e);
       })
     );
   }

   getclient(id): Observable<client>{
     return this.http.get<client>(`${this.urlEndPoint}/${id}`).pipe(
       catchError(e => {
         this.router.navigate(['/clientes'])
         console.error(e.error.mensaje);
         swal('Error on update', e.error.mensaje, 'error');
         return throwError(e);
       })
     );
   }

   update(client: client): Observable<client> {
      return this.http.put(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
        map( (response: any) => response.client as client),
        catchError(e => {

          if(e.status == 400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal('Error on update', e.error.mensaje, 'error')
          return throwError(e);
        })
      );
   }

   delete(id: number): Observable<client>{
     return this.http.delete<client>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
       catchError(e => {
         console.error(e.error.mensaje);
         swal('Error on delete', e.error.mensaje, 'error')
         return throwError(e);
       })
     );
   }
}
