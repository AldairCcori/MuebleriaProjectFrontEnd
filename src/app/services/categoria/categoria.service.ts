import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { error } from 'jquery';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url: string = 'http://localhost:8080/apis/categoria';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient, private router: Router) {}

  //para listar las categorias
  getCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.url}`);
  }

  //para guardas las categorias
  getSaveCategorias(categoria: Categoria): Observable<Categoria> {
    return this.httpClient
      .post<Categoria>(this.url, categoria, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          //swal.fire(e.error, e.error.error, 'error');
          console.log('ERROR ' + e.error);
          return throwError(e);
        })
      );
  }

  getCategoriaUpdate(id: any): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.url}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        this.router.navigate(['/categoria']);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    console.log('categoria obtenida' + JSON.stringify(categoria));
    return this.httpClient
      .put<Categoria>(`${this.url}/${categoria.id}`, categoria, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          swal.fire(e.error.error, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  deleteCategoria(id: number): Observable<Categoria> {
    return this.httpClient
      .delete<Categoria>(`${this.url}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          swal.fire(e.error.error, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
