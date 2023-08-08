import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import {
  Observable,
  of,
  map,
  catchError,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { Product } from 'src/app/models/product';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = 'http://localhost:8080/api/productos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient, private router: Router) {}

  //Listar Los productos en la tabla
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}`);
  }

  //Para guardar los productos en la base de datos
  getSaveProduct(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(this.url, product, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          swal.fire(e.error.error, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Para cargar los productos en el formulario actualizar
  getProduct(id: any): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        this.router.navigate(['/producto']);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //Para actualizar el producto
  updateProduct(producto: Product): Observable<Product> {
    return this.httpClient
      .put<Product>(`${this.url}/${producto.id}`, producto, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          swal.fire(e.error.error, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Para eliminar el producto
  deletaProduct(id: number): Observable<Product> {
    return this.httpClient
      .delete<Product>(`${this.url}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          swal.fire(e.error.error, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Para subir la foto a la vista desde el backend
  subirFoto(archivo: File, id: any): Observable<Product> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    return this.httpClient.post(`${this.url}/upload`, formData).pipe(
      map((response: any) => response.producto as Product),
      catchError((e) => {
        this.router.navigate(['/detalle/:id']);
        swal.fire(e.error.error, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
