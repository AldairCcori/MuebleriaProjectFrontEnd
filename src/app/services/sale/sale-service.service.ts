import { User } from 'src/app/models/user';
import { VentaDTO } from 'src/app/models/ventaDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FactoryProvider, Injectable } from '@angular/core';
import baseUrl from '../helper';
import {
  Observable,
  of,
  map,
  catchError,
  throwError,
  BehaviorSubject,
  switchMap,
} from 'rxjs';

import { Router } from '@angular/router';

import { factura } from 'src/app/models/factura';

@Injectable({
  providedIn: 'root',
})
export class SaleServiceService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private url: string = 'http://localhost:8080/api/grabarVenta';
  private factura: factura;

  constructor(private httpClient: HttpClient, private router: Router) {}

  vender(ventaDTO: VentaDTO) {
    console.log('DATA ENVIADA a BACKEND' + JSON.stringify(ventaDTO));

    return this.httpClient.post<factura>(this.url, ventaDTO);
  }
}
